import { ACTIVE, CATEGORIES, type Category, type Dish, type Invoice } from '../types';

export function getActiveInvoice(invoices: Invoice[], tableNumber: number): Invoice | undefined {
  return invoices.find(i => i.tableNumber === tableNumber && i.status === ACTIVE);
}

export function busyTables(invoices: Invoice[]): Set<number> {
  return new Set(invoices.filter(i => i.status === ACTIVE).map(i => i.tableNumber));
}

export function findActiveInvoiceWithDish(invoices: Invoice[], dishId: string): Invoice | undefined {
  return invoices.find(i => i.status === ACTIVE && i.items.some(item => item.dishId === dishId));
}

export type DishSection = { title: Category; data: Dish[] };

export function groupByCategory(dishes: Dish[]): DishSection[] {
  return CATEGORIES.map(title => ({
    title,
    data: dishes.filter(d => d.category === title),
  })).filter(section => section.data.length > 0);
}

export type InvoiceLine = {
  dishId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type InvoiceCalc = {
  lines: InvoiceLine[];
  count: number;
  subtotal: number;
  vat: number;
  total: number;
};

export function calcInvoice(invoice: Invoice | undefined, dishes: Dish[]): InvoiceCalc {
  const lines: InvoiceLine[] = (invoice ? invoice.items : []).map(item => {
    const dish = dishes.find(d => d.id === item.dishId);
    const unitPrice = dish ? dish.price : 0;
    return {
      dishId: item.dishId,
      name: dish ? dish.name : '(Món đã xoá)',
      quantity: item.quantity,
      unitPrice,
      lineTotal: unitPrice * item.quantity,
    };
  });
  const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
  const vat = Math.round(subtotal * 0.08);
  const count = lines.reduce((sum, l) => sum + l.quantity, 0);
  return { lines, count, subtotal, vat, total: subtotal + vat };
}
