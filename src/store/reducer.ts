import type { Category, Dish, Invoice } from '../types';

export type State = { dishes: Dish[]; invoices: Invoice[]; hydrated: boolean };

export type Action =
  | { type: 'HYDRATE'; dishes: Dish[]; invoices: Invoice[] }
  | { type: 'TOGGLE_AVAILABLE'; dishId: string }
  | { type: 'ADD_DISH'; id: string; name: string; category: Category; price: number }
  | { type: 'UPDATE_DISH'; id: string; name: string; category: Category; price: number }
  | { type: 'DELETE_DISH'; dishId: string }
  | {
      type: 'CHANGE_QUANTITY';
      tableNumber: number;
      dishId: string;
      delta: number;
      // Only used when this action creates the table's invoice.
      newInvoiceId: string;
      createdAt: string;
    }
  | { type: 'PAY'; invoiceId: string };

export const initialState: State = { dishes: [], invoices: [], hydrated: false };

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'HYDRATE':
      return { dishes: action.dishes, invoices: action.invoices, hydrated: true };

    case 'TOGGLE_AVAILABLE':
      return {
        ...state,
        dishes: state.dishes.map(d =>
          d.id === action.dishId ? { ...d, available: !d.available } : d,
        ),
      };

    case 'ADD_DISH':
      return {
        ...state,
        dishes: [
          ...state.dishes,
          {
            id: action.id,
            name: action.name,
            category: action.category,
            price: action.price,
            available: true,
          },
        ],
      };

    case 'UPDATE_DISH':
      return {
        ...state,
        dishes: state.dishes.map(d =>
          d.id === action.id
            ? { ...d, name: action.name, category: action.category, price: action.price }
            : d,
        ),
      };

    case 'DELETE_DISH':
      return { ...state, dishes: state.dishes.filter(d => d.id !== action.dishId) };

    case 'CHANGE_QUANTITY': {
      const { tableNumber, dishId, delta } = action;
      const dish = state.dishes.find(d => d.id === dishId);
      if (delta > 0 && (!dish || !dish.available)) {
        return state;
      }
      const active = state.invoices.find(
        i => i.tableNumber === tableNumber && i.status === 'Đang phục vụ',
      );
      if (!active) {
        if (delta <= 0) {
          return state;
        }
        const created: Invoice = {
          id: action.newInvoiceId,
          tableNumber,
          items: [{ dishId, quantity: delta }],
          status: 'Đang phục vụ',
          createdAt: action.createdAt,
        };
        return { ...state, invoices: [...state.invoices, created] };
      }
      const current = active.items.find(i => i.dishId === dishId)?.quantity ?? 0;
      const next = current + delta;
      let items = active.items.filter(i => i.dishId !== dishId);
      if (next > 0) {
        items = current > 0
          ? active.items.map(i => (i.dishId === dishId ? { ...i, quantity: next } : i))
          : [...items, { dishId, quantity: next }];
      }
      return {
        ...state,
        invoices: state.invoices.map(i => (i.id === active.id ? { ...i, items } : i)),
      };
    }

    case 'PAY':
      return {
        ...state,
        invoices: state.invoices.map(i =>
          i.id === action.invoiceId ? { ...i, status: 'Đã thanh toán' } : i,
        ),
      };

    default:
      return state;
  }
}
