import { ACTIVE, PAID, type Category, type Dish, type Invoice } from '../types';
import { createId } from '../utils/id';
import { formatDateTime } from '../utils/format';

export type State = { dishes: Dish[]; invoices: Invoice[]; hydrated: boolean };

export type Action =
  | { type: 'HYDRATE'; dishes: Dish[]; invoices: Invoice[] }
  | { type: 'TOGGLE_AVAILABLE'; dishId: string }
  | {
      type: 'SAVE_DISH';
      id?: string;
      name: string;
      category: Category;
      price: number;
      available: boolean;
    }
  | { type: 'DELETE_DISH'; dishId: string }
  | { type: 'CHANGE_QUANTITY'; tableNumber: number; dishId: string; delta: number }
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

    case 'SAVE_DISH': {
      const { id, name, category, price, available } = action;
      if (id === undefined) {
        return {
          ...state,
          dishes: [...state.dishes, { id: createId(), name, category, price, available }],
        };
      }
      return {
        ...state,
        dishes: state.dishes.map(d => (d.id === id ? { id, name, category, price, available } : d)),
      };
    }

    case 'DELETE_DISH':
      return { ...state, dishes: state.dishes.filter(d => d.id !== action.dishId) };

    case 'CHANGE_QUANTITY': {
      const { tableNumber, dishId, delta } = action;
      const dish = state.dishes.find(d => d.id === dishId);
      if (delta > 0 && (!dish || !dish.available)) {
        return state;
      }
      const active = state.invoices.find(i => i.tableNumber === tableNumber && i.status === ACTIVE);
      if (!active) {
        if (delta <= 0) {
          return state;
        }
        const created: Invoice = {
          id: createId(),
          tableNumber,
          items: [{ dishId, quantity: delta }],
          status: ACTIVE,
          createdAt: formatDateTime(new Date()),
        };
        return { ...state, invoices: [...state.invoices, created] };
      }
      const current = active.items.find(i => i.dishId === dishId)?.quantity ?? 0;
      const next = current + delta;
      let items = active.items.filter(i => i.dishId !== dishId);
      if (next > 0) {
        items =
          current > 0
            ? active.items.map(i => (i.dishId === dishId ? { ...i, quantity: next } : i))
            : [...items, { dishId, quantity: next }];
      }
      if (items.length === 0) {
        return { ...state, invoices: state.invoices.filter(i => i.id !== active.id) };
      }
      return {
        ...state,
        invoices: state.invoices.map(i => (i.id === active.id ? { ...i, items } : i)),
      };
    }

    case 'PAY':
      return {
        ...state,
        invoices: state.invoices.map(i => (i.id === action.invoiceId ? { ...i, status: PAID } : i)),
      };

    default:
      return state;
  }
}
