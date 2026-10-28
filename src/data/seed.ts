import type { Dish, Invoice } from '../types';
import { ACTIVE } from '../types';
import { formatDateTime } from '../utils/format';

export const SEED_DISHES: Dish[] = [
  { id: 'd1', name: 'Gỏi cuốn tôm thịt', category: 'Khai vị', price: 45000, available: true },
  { id: 'd2', name: 'Chả giò hải sản', category: 'Khai vị', price: 55000, available: true },
  { id: 'd3', name: 'Súp cua', category: 'Khai vị', price: 40000, available: true },
  { id: 'd4', name: 'Bò lúc lắc', category: 'Món chính', price: 145000, available: true },
  { id: 'd5', name: 'Cá kho tộ', category: 'Món chính', price: 95000, available: false },
  { id: 'd6', name: 'Cơm chiên hải sản', category: 'Món chính', price: 75000, available: true },
  { id: 'd7', name: 'Lẩu thái hải sản', category: 'Món chính', price: 289000, available: true },
  { id: 'd8', name: 'Chè khúc bạch', category: 'Tráng miệng', price: 35000, available: true },
  { id: 'd9', name: 'Bánh flan caramel', category: 'Tráng miệng', price: 25000, available: true },
  { id: 'd10', name: 'Trà đào cam sả', category: 'Đồ uống', price: 39000, available: true },
  { id: 'd11', name: 'Nước ép dưa hấu', category: 'Đồ uống', price: 35000, available: true },
  { id: 'd12', name: 'Cà phê sữa đá', category: 'Đồ uống', price: 29000, available: true },
];

const minutesAgo = (m: number) => formatDateTime(new Date(Date.now() - m * 60000));

export function createSeedInvoices(): Invoice[] {
  return [
    {
      id: 'b1',
      tableNumber: 3,
      items: [
        { dishId: 'd1', quantity: 2 },
        { dishId: 'd4', quantity: 1 },
        { dishId: 'd10', quantity: 2 },
      ],
      status: ACTIVE,
      createdAt: minutesAgo(42),
    },
    {
      id: 'b2',
      tableNumber: 6,
      items: [
        { dishId: 'd7', quantity: 1 },
        { dishId: 'd12', quantity: 3 },
      ],
      status: ACTIVE,
      createdAt: minutesAgo(15),
    },
  ];
}
