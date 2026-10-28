import type { Dish } from '../types';

export type DishErrors = { name?: string; price?: string };

export function validateDish(
  input: { name: string; price: string },
  dishes: Dish[],
  editingId?: string,
): DishErrors {
  const errors: DishErrors = {};
  const name = input.name.trim();
  if (name === '') {
    errors.name = 'Tên món không được để trống';
  } else if (
    dishes.some(d => d.id !== editingId && d.name.trim().toLowerCase() === name.toLowerCase())
  ) {
    errors.name = 'Tên món đã tồn tại';
  }

  const priceText = input.price.trim();
  if (!/^\d+$/.test(priceText) || Number(priceText) <= 0) {
    errors.price = 'Giá phải là số lớn hơn 0';
  } else if (Number(priceText) % 1000 !== 0) {
    errors.price = 'Giá phải là bội số của 1.000';
  }
  return errors;
}
