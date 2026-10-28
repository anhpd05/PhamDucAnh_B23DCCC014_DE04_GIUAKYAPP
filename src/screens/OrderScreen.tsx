import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import OrderDishRow from '../components/OrderDishRow';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import {
  getActiveInvoice,
  groupByCategory,
  invoiceLines,
  subtotalOf,
} from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import type { Dish } from '../types';
import { formatDateTime, formatMoney } from '../utils/format';
import { createId } from '../utils/id';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Order'>;

export default function OrderScreen() {
  const navigation = useNavigation<Nav>();
  const { tableNumber } = useRoute<RouteProp<RootStackParamList, 'Order'>>().params;
  const { state, dispatch } = useApp();

  const sections = useMemo(() => groupByCategory(state.dishes), [state.dishes]);
  const invoice = getActiveInvoice(state.invoices, tableNumber);
  const subtotal = useMemo(
    () => (invoice ? subtotalOf(invoiceLines(invoice, state.dishes)) : 0),
    [invoice, state.dishes],
  );

  const quantityOf = (dishId: string) =>
    invoice?.items.find(i => i.dishId === dishId)?.quantity ?? 0;

  const change = (dishId: string, delta: number) =>
    dispatch({
      type: 'CHANGE_QUANTITY',
      tableNumber,
      dishId,
      delta,
      newInvoiceId: createId(),
      createdAt: formatDateTime(new Date()),
    });

  const handleDecrease = (dish: Dish) => {
    if (quantityOf(dish.id) === 1) {
      Alert.alert('Bỏ món', `Bỏ món ${dish.name} khỏi hoá đơn?`, [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Bỏ món', style: 'destructive', onPress: () => change(dish.id, -1) },
      ]);
      return;
    }
    change(dish.id, -1);
  };

  return (
    <ScreenContainer>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={dish => dish.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
        renderItem={({ item }) => (
          <OrderDishRow
            dish={item}
            quantity={quantityOf(item.id)}
            onIncrease={() => change(item.id, 1)}
            onDecrease={() => handleDecrease(item)}
          />
        )}
        ListEmptyComponent={<EmptyState message="Thực đơn trống" />}
      />
      <View style={styles.footer}>
        <Text style={styles.subtotal}>Tạm tính: {formatMoney(subtotal)}</Text>
        <AppButton
          title="Thanh toán"
          onPress={() => navigation.navigate('Payment', { tableNumber })}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: { flex: 1 },
  listContent: { paddingHorizontal: spacing.lg, flexGrow: 1 },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  subtotal: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.md,
  },
});
