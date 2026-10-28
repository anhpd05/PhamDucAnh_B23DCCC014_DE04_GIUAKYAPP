import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSeedInvoices, SEED_DISHES } from '../data/seed';
import type { Dish, Invoice } from '../types';

const DISHES_KEY = '@restaurant/dishes';
const INVOICES_KEY = '@restaurant/invoices';

export type LoadedData = { dishes: Dish[]; invoices: Invoice[] };

function seed(): LoadedData {
  return { dishes: SEED_DISHES.map(d => ({ ...d })), invoices: createSeedInvoices() };
}

export async function loadData(): Promise<LoadedData> {
  try {
    const [rawDishes, rawInvoices] = await Promise.all([
      AsyncStorage.getItem(DISHES_KEY),
      AsyncStorage.getItem(INVOICES_KEY),
    ]);
    if (rawDishes === null && rawInvoices === null) {
      return seed();
    }
    const dishes: unknown = rawDishes === null ? [] : JSON.parse(rawDishes);
    const invoices: unknown = rawInvoices === null ? [] : JSON.parse(rawInvoices);
    if (!Array.isArray(dishes) || !Array.isArray(invoices)) {
      return seed();
    }
    return { dishes: dishes as Dish[], invoices: invoices as Invoice[] };
  } catch (error) {
    console.warn('loadData failed, using seed data', error);
    return seed();
  }
}

export async function saveDishes(dishes: Dish[]): Promise<void> {
  try {
    await AsyncStorage.setItem(DISHES_KEY, JSON.stringify(dishes));
  } catch (error) {
    console.warn('saveDishes failed', error);
  }
}

export async function saveInvoices(invoices: Invoice[]): Promise<void> {
  try {
    await AsyncStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
  } catch (error) {
    console.warn('saveInvoices failed', error);
  }
}
