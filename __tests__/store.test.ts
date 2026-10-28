import { SEED_DISHES, createSeedInvoices } from '../src/data/seed';
import { initialState, reducer, State, Action } from '../src/store/reducer';
import { busyTableCount, calcTotals, getActiveInvoice } from '../src/store/selectors';
import { formatDateTime, formatMoney } from '../src/utils/format';
import { validateDish } from '../src/utils/validation';

const fresh = (): State => ({
  dishes: SEED_DISHES.map(d => ({ ...d })),
  invoices: createSeedInvoices(),
  hydrated: true,
});

const qty = (tableNumber: number, dishId: string, delta: number, n = 'n1'): Action => ({
  type: 'CHANGE_QUANTITY',
  tableNumber,
  dishId,
  delta,
  newInvoiceId: n,
  createdAt: '09:05 28/10/2026',
});

describe('CHANGE_QUANTITY', () => {
  it('creates one invoice on an empty table and reuses it afterwards', () => {
    let s = reducer(fresh(), qty(5, 'd1', 1, 'a'));
    s = reducer(s, qty(5, 'd1', 1, 'b'));
    const t5 = s.invoices.filter(i => i.tableNumber === 5);
    expect(t5).toHaveLength(1);
    expect(t5[0].items).toEqual([{ dishId: 'd1', quantity: 2 }]);
  });

  it('removes the item at 0 but keeps the invoice', () => {
    let s = reducer(fresh(), qty(5, 'd1', 1));
    s = reducer(s, qty(5, 'd1', -1));
    expect(getActiveInvoice(s.invoices, 5)?.items).toEqual([]);
  });

  it('ignores + on an unavailable dish', () => {
    let s = reducer(fresh(), { type: 'TOGGLE_AVAILABLE', dishId: 'd3' });
    const before = s;
    s = reducer(s, qty(5, 'd3', 1));
    expect(s).toBe(before);
  });

  it('still allows - on an unavailable dish already in the invoice', () => {
    let s = reducer(fresh(), { type: 'TOGGLE_AVAILABLE', dishId: 'd3' });
    s = reducer(s, qty(3, 'd3', -1));
    expect(getActiveInvoice(s.invoices, 3)?.items).toEqual([{ dishId: 'd1', quantity: 2 }]);
  });
});

describe('PAY', () => {
  it('closes the invoice and frees the table', () => {
    const s0 = fresh();
    expect(busyTableCount(s0.invoices)).toBe(1);
    const s1 = reducer(s0, { type: 'PAY', invoiceId: 'inv1' });
    expect(busyTableCount(s1.invoices)).toBe(0);
    expect(s1.invoices[0].status).toBe('Đã thanh toán');
  });
});

describe('format and totals', () => {
  it('formats money', () => {
    expect(formatMoney(45000)).toBe('45.000 đ');
    expect(formatMoney(1250000)).toBe('1.250.000 đ');
  });
  it('computes VAT 8%', () => {
    expect(calcTotals(125000)).toEqual({ subtotal: 125000, vat: 10000, total: 135000 });
  });
  it('formats date time', () => {
    expect(formatDateTime(new Date(2026, 9, 28, 9, 5))).toBe('09:05 28/10/2026');
  });
});

describe('validateDish', () => {
  const dishes = SEED_DISHES;
  it('rejects empty and duplicate names', () => {
    expect(validateDish({ name: '', price: '45000' }, dishes).name).toBeDefined();
    expect(validateDish({ name: 'gỏi CUỐN', price: '45000' }, dishes).name).toBeDefined();
  });
  it('allows keeping the name when editing', () => {
    expect(validateDish({ name: 'Gỏi cuốn', price: '45000' }, dishes, 'd1')).toEqual({});
  });
  it('rejects bad prices', () => {
    for (const p of ['0', 'abc', '-5000', '45500', '']) {
      expect(validateDish({ name: 'X', price: p }, dishes).price).toBeDefined();
    }
    expect(validateDish({ name: 'X', price: '45000' }, dishes)).toEqual({});
  });
});

describe('initial reducer state', () => {
  it('starts unhydrated', () => {
    expect(initialState.hydrated).toBe(false);
  });
});
