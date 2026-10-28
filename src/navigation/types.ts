export type RootStackParamList = {
  Menu: undefined;
  DishForm: { dishId?: string };
  TableMap: undefined;
  Order: { tableNumber: number };
  Payment: { tableNumber: number };
};
