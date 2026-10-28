export const CATEGORIES = ['Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống'] as const;
export type Category = (typeof CATEGORIES)[number];

export const TABLE_COUNT = 10;

export type Dish = {
  id: string;
  name: string;
  category: Category;
  price: number;
  available: boolean;
};

export type InvoiceItem = { dishId: string; quantity: number };
export type InvoiceStatus = 'Đang phục vụ' | 'Đã thanh toán';

export type Invoice = {
  id: string;
  tableNumber: number;
  items: InvoiceItem[];
  status: InvoiceStatus;
  createdAt: string;
};
