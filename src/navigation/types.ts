export type HomeTab = 'tables' | 'menu';

export type RootStackParamList = {
  Home: { tab?: HomeTab } | undefined;
  DishForm: { dishId?: string };
  Order: { tableNumber: number };
  Payment: { tableNumber: number };
};
