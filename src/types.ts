export const CATEGORIES = ['Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống'] as const;
export type Category = (typeof CATEGORIES)[number];

export const TABLE_COUNT = 10;
export const ACTIVE = 'Đang phục vụ';
export const PAID = 'Đã thanh toán';

export type Dish = {
  id: string;
  name: string;
  category: Category;
  price: number;
  available: boolean;
};

export type InvoiceItem = { dishId: string; quantity: number };
export type InvoiceStatus = typeof ACTIVE | typeof PAID;

export type Invoice = {
  id: string;
  tableNumber: number;
  items: InvoiceItem[];
  status: InvoiceStatus;
  createdAt: string;
};
