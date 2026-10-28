import { createSeedInvoices, SEED_DISHES } from '../src/data/seed';
import { reducer, type Action, type State } from '../src/store/reducer';
import {
  busyTables,
  calcInvoice,
  findActiveInvoiceWithDish,
  getActiveInvoice,
  groupByCategory,
} from '../src/store/selectors';
import { formatDateTime, formatMoney } from '../src/utils/format';
import { validateDish } from '../src/utils/validation';

const fresh = (): State => ({
  dishes: SEED_DISHES.map(d => ({ ...d })),
  invoices: createSeedInvoices(),
  hydrated: true,
});

const qty = (tableNumber: number, dishId: string, delta: number): Action => ({
  type: 'CHANGE_QUANTITY',
  tableNumber,
  dishId,
  delta,
});

describe('CHANGE_QUANTITY', () => {
  it('creates one invoice on an empty table and reuses it afterwards', () => {
    let s = reducer(fresh(), qty(5, 'd1', 1));
    s = reducer(s, qty(5, 'd1', 1));
    const t5 = s.invoices.filter(i => i.tableNumber === 5);
    expect(t5).toHaveLength(1);
    expect(t5[0].items).toEqual([{ dishId: 'd1', quantity: 2 }]);
  });

  it('ignores - on an empty table', () => {
    const s0 = fresh();
    expect(reducer(s0, qty(5, 'd1', -1))).toBe(s0);
  });

  it('deletes the invoice when the last dish drops to 0', () => {
    let s = reducer(fresh(), qty(5, 'd1', 1));
    expect(busyTables(s.invoices).has(5)).toBe(true);
    s = reducer(s, qty(5, 'd1', -1));
    expect(busyTables(s.invoices).has(5)).toBe(false);
    expect(getActiveInvoice(s.invoices, 5)).toBeUndefined();
  });

  it('ignores + on a sold-out dish', () => {
    const s0 = fresh();
    expect(reducer(s0, qty(5, 'd5', 1))).toBe(s0);
  });
});

describe('PAY', () => {
  it('closes the invoice and frees the table', () => {
    const s0 = fresh();
    expect(busyTables(s0.invoices).size).toBe(2);
    const s1 = reducer(s0, { type: 'PAY', invoiceId: 'b1' });
    expect(busyTables(s1.invoices).size).toBe(1);
    expect(s1.invoices.find(i => i.id === 'b1')?.status).toBe('Đã thanh toán');
  });
});

describe('SAVE_DISH / DELETE_DISH', () => {
  it('adds a new dish and edits an existing one', () => {
    let s = reducer(fresh(), {
      type: 'SAVE_DISH',
      name: 'Trà sữa',
      category: 'Đồ uống',
      price: 30000,
      available: true,
    });
    expect(s.dishes).toHaveLength(13);
    s = reducer(s, {
      type: 'SAVE_DISH',
      id: 'd1',
      name: 'Gỏi cuốn',
      category: 'Khai vị',
      price: 50000,
      available: false,
    });
    expect(s.dishes.find(d => d.id === 'd1')).toMatchObject({ price: 50000, available: false });
    expect(s.dishes).toHaveLength(13);
  });

  it('deletes a dish', () => {
    const s = reducer(fresh(), { type: 'DELETE_DISH', dishId: 'd9' });
    expect(s.dishes.find(d => d.id === 'd9')).toBeUndefined();
  });
});

describe('selectors', () => {
  it('finds the active invoice containing a dish', () => {
    const s = fresh();
    expect(findActiveInvoiceWithDish(s.invoices, 'd1')?.tableNumber).toBe(3);
    expect(findActiveInvoiceWithDish(s.invoices, 'd7')?.tableNumber).toBe(6);
    expect(findActiveInvoiceWithDish(s.invoices, 'd9')).toBeUndefined();
  });

  it('groups dishes by the four categories', () => {
    expect(groupByCategory(fresh().dishes).map(g => g.title)).toEqual([
      'Khai vị',
      'Món chính',
      'Tráng miệng',
      'Đồ uống',
    ]);
  });

  it('computes invoice totals with 8% VAT', () => {
    const s = fresh();
    const calc = calcInvoice(getActiveInvoice(s.invoices, 3), s.dishes);
    expect(calc).toMatchObject({ subtotal: 313000, vat: 25040, total: 338040, count: 5 });
    expect(calcInvoice(getActiveInvoice(s.invoices, 6), s.dishes).subtotal).toBe(376000);
  });
});

describe('format', () => {
  it('formats money', () => {
    expect(formatMoney(45000)).toBe('45.000 đ');
    expect(formatMoney(1250000)).toBe('1.250.000 đ');
  });
  it('formats date time', () => {
    expect(formatDateTime(new Date(2026, 9, 28, 9, 5))).toBe('09:05 28/10/2026');
  });
});

describe('validateDish', () => {
  const dishes = SEED_DISHES;
  it('validates names', () => {
    expect(validateDish({ name: '', price: '45000' }, dishes).name).toBe('Vui lòng nhập tên món');
    expect(validateDish({ name: 'gỏi cuốn TÔM THỊT', price: '45000' }, dishes).name).toBe(
      'Tên món đã tồn tại',
    );
    expect(validateDish({ id: 'd1', name: 'Gỏi cuốn tôm thịt', price: '45000' }, dishes)).toEqual({});
  });
  it('validates prices', () => {
    expect(validateDish({ name: 'X', price: '' }, dishes).price).toBe('Vui lòng nhập giá bán');
    for (const p of ['abc', '0', '-5000']) {
      expect(validateDish({ name: 'X', price: p }, dishes).price).toBe('Giá phải là số lớn hơn 0');
    }
    expect(validateDish({ name: 'X', price: '45500' }, dishes).price).toBe(
      'Giá phải là bội số của 1.000',
    );
    expect(validateDish({ name: 'X', price: '45000' }, dishes)).toEqual({});
  });
});
