import type { Dish, Invoice } from '../types';
import { formatDateTime } from '../utils/format';

export const SEED_DISHES: Dish[] = [
  { id: 'd1', name: 'Gỏi cuốn', category: 'Khai vị', price: 35000, available: true },
  { id: 'd2', name: 'Súp cua', category: 'Khai vị', price: 40000, available: true },
  { id: 'd3', name: 'Phở bò', category: 'Món chính', price: 55000, available: true },
  { id: 'd4', name: 'Cơm tấm sườn', category: 'Món chính', price: 50000, available: true },
  { id: 'd5', name: 'Chè khúc bạch', category: 'Tráng miệng', price: 30000, available: true },
  { id: 'd6', name: 'Bánh flan', category: 'Tráng miệng', price: 20000, available: true },
  { id: 'd7', name: 'Trà đào', category: 'Đồ uống', price: 25000, available: true },
  { id: 'd8', name: 'Cà phê sữa đá', category: 'Đồ uống', price: 22000, available: true },
];

export function createSeedInvoices(): Invoice[] {
  return [
    {
      id: 'inv1',
      tableNumber: 3,
      items: [
        { dishId: 'd1', quantity: 2 },
        { dishId: 'd3', quantity: 1 },
      ],
      status: 'Đang phục vụ',
      createdAt: formatDateTime(new Date()),
    },
  ];
}
