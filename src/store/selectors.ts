import { CATEGORIES, type Category, type Dish, type Invoice } from '../types';

export function getActiveInvoice(invoices: Invoice[], tableNumber: number): Invoice | undefined {
  return invoices.find(i => i.tableNumber === tableNumber && i.status === 'Đang phục vụ');
}

export function busyTableCount(invoices: Invoice[]): number {
  return new Set(invoices.filter(i => i.status === 'Đang phục vụ').map(i => i.tableNumber)).size;
}

export function isDishInActiveInvoice(invoices: Invoice[], dishId: string): boolean {
  return invoices.some(
    i => i.status === 'Đang phục vụ' && i.items.some(item => item.dishId === dishId),
  );
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

export function invoiceLines(invoice: Invoice, dishes: Dish[]): InvoiceLine[] {
  return invoice.items.map(item => {
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
}

export function calcTotals(subtotal: number) {
  const vat = Math.round(subtotal * 0.08);
  return { subtotal, vat, total: subtotal + vat };
}

export function subtotalOf(lines: InvoiceLine[]): number {
  return lines.reduce((sum, l) => sum + l.lineTotal, 0);
}
