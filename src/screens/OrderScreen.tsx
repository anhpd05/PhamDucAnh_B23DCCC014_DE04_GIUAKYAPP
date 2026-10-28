import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import EmptyState from '../components/EmptyState';
import OrderDishRow from '../components/OrderDishRow';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import SectionHeader from '../components/SectionHeader';
import StatusChip from '../components/StatusChip';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { calcInvoice, getActiveInvoice, groupByCategory } from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, shadow } from '../theme/typography';
import type { Dish } from '../types';
import { formatMoney } from '../utils/format';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Order'>;

export default function OrderScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<Nav>();
  const { tableNumber } = useRoute<RouteProp<RootStackParamList, 'Order'>>().params;

  const invoice = getActiveInvoice(state.invoices, tableNumber);
  const calc = useMemo(() => calcInvoice(invoice, state.dishes), [invoice, state.dishes]);
  const quantities = useMemo(
    () => new Map((invoice ? invoice.items : []).map(i => [i.dishId, i.quantity])),
    [invoice],
  );

  const sections = useMemo(
    () =>
      groupByCategory(state.dishes).map(s => ({
        title: s.title,
        data: [...s.data].sort((a, b) => Number(b.available) - Number(a.available)),
      })),
    [state.dishes],
  );

  const change = (dishId: string, delta: number) =>
    dispatch({ type: 'CHANGE_QUANTITY', tableNumber, dishId, delta });

  const handleDecrease = (dish: Dish) => {
    const qty = quantities.get(dish.id) ?? 0;
    if (qty > 1) {
      change(dish.id, -1);
      return;
    }
    const isLast = quantities.size === 1;
    Alert.alert(
      'Bỏ món?',
      `Bỏ “${dish.name}” khỏi hoá đơn bàn ${tableNumber}?${isLast ? ' Bàn sẽ trở về trống.' : ''}`,
      [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Bỏ món', style: 'destructive', onPress: () => change(dish.id, -1) },
      ],
    );
  };

  const hasItems = calc.lines.length > 0;

  return (
    <ScreenContainer whiteFooter>
      <ScreenHeader
        title={`Gọi món · Bàn ${tableNumber}`}
        backLabel="Sơ đồ bàn"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.status}>
        <StatusChip label={invoice ? 'Đang phục vụ' : 'Bàn trống'} tone={invoice ? 'serving' : 'free'} />
        <Text style={styles.statusText}>
          {invoice ? `Mở lúc ${invoice.createdAt}` : 'Chưa có hoá đơn'}
        </Text>
      </View>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.content}
        sections={sections}
        keyExtractor={d => d.id}
        stickySectionHeadersEnabled={false}
        ListEmptyComponent={<EmptyState title="Thực đơn trống — hãy thêm món trước." />}
        renderSectionHeader={({ section }) => {
          const ordered = section.data.filter(d => quantities.has(d.id)).length;
          return (
            <SectionHeader
              title={section.title}
              right={ordered > 0 ? `${ordered}/${section.data.length} đã gọi` : `${section.data.length} món`}
              rightAccent={ordered > 0}
            />
          );
        }}
        renderItem={({ item }) => (
          <OrderDishRow
            dish={item}
            quantity={quantities.get(item.id) ?? 0}
            onIncrease={() => change(item.id, 1)}
            onDecrease={() => handleDecrease(item)}
          />
        )}
      />
      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Tạm tính</Text>
            <Text style={styles.totalSub}>
              {hasItems
                ? `${calc.count} phần · ${calc.lines.length} món`
                : 'Chạm vào món để gọi'}
            </Text>
          </View>
          <Text style={styles.total}>{formatMoney(calc.subtotal)}</Text>
        </View>
        <View style={styles.buttons}>
          <AppButton
            title="Xong"
            variant="outline"
            onPress={() => navigation.goBack()}
            style={styles.btnDone}
          />
          <AppButton
            title="Thanh toán"
            disabled={!hasItems}
            onPress={() => navigation.navigate('Payment', { tableNumber })}
            style={styles.btnPay}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statusText: { fontSize: fontSize.small, color: colors.textSub },
  list: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 12 },
  footer: { backgroundColor: colors.card, padding: 16, ...shadow, shadowOffset: { width: 0, height: -2 } },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  totalLabel: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  totalSub: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
  total: { fontSize: fontSize.big, fontWeight: fontWeight.bold, color: colors.text },
  buttons: { flexDirection: 'row', gap: 12 },
  btnDone: { flex: 1 },
  btnPay: { flex: 2 },
});
