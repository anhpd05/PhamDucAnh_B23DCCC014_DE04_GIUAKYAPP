import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, shadow } from '../theme/typography';
import type { Dish } from '../types';
import { formatMoney } from '../utils/format';
import AppButton from './AppButton';
import QuantityStepper from './QuantityStepper';

type Props = {
  dish: Dish;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function OrderDishRow({ dish, quantity, onIncrease, onDecrease }: Props) {
  const soldOut = !dish.available;
  return (
    <View style={[styles.card, quantity > 0 && styles.cardOrdered]}>
      <View style={[styles.info, soldOut && styles.dim]}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.price}>{formatMoney(dish.price)}</Text>
      </View>
      {soldOut ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Hết món</Text>
        </View>
      ) : null}
      {quantity > 0 ? (
        <QuantityStepper
          quantity={quantity}
          canIncrease={!soldOut}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ) : (
        <AppButton
          title="+ Thêm"
          small
          variant="soft"
          disabled={soldOut}
          onPress={onIncrease}
          style={styles.addBtn}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.card,
    borderRadius: radius.card,
    borderWidth: 1.5,
    borderColor: colors.card,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    ...shadow,
  },
  cardOrdered: { borderColor: colors.primary },
  info: { flex: 1 },
  dim: { opacity: 0.45 },
  name: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  price: { fontSize: fontSize.body, color: colors.textSub, marginTop: 2 },
  badge: { backgroundColor: colors.dangerSoft, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: fontSize.tiny, fontWeight: fontWeight.semibold, color: colors.danger },
  addBtn: { paddingHorizontal: 14 },
});
