import type { Dish } from '../types';

export type DishErrors = { name?: string; price?: string };

export function validateDish(
  form: { id?: string; name: string; price: string },
  dishes: Dish[],
): DishErrors {
  const errors: DishErrors = {};
  const name = form.name.trim();
  if (name === '') {
    errors.name = 'Vui lòng nhập tên món';
  } else if (
    dishes.some(d => d.id !== form.id && d.name.trim().toLowerCase() === name.toLowerCase())
  ) {
    errors.name = 'Tên món đã tồn tại';
  }

  const priceText = form.price.trim();
  if (priceText === '') {
    errors.price = 'Vui lòng nhập giá bán';
  } else if (!/^\d+$/.test(priceText) || Number(priceText) <= 0) {
    errors.price = 'Giá phải là số lớn hơn 0';
  } else if (Number(priceText) % 1000 !== 0) {
    errors.price = 'Giá phải là bội số của 1.000';
  }
  return errors;
}
