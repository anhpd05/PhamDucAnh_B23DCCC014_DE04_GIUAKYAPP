import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import type { Dish } from '../types';
import { formatMoney } from '../utils/format';
import Card from './Card';
import QuantityStepper from './QuantityStepper';

type Props = {
  dish: Dish;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function OrderDishRow({ dish, quantity, onIncrease, onDecrease }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.info}>
        <Text style={styles.name}>{dish.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatMoney(dish.price)}</Text>
          {!dish.available && <Text style={styles.soldOut}>Hết món</Text>}
        </View>
      </View>
      <QuantityStepper
        quantity={quantity}
        canIncrease={dish.available}
        canDecrease={quantity > 0}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  info: { flex: 1, paddingRight: spacing.md },
  name: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  price: { fontSize: fontSize.small, color: colors.textMuted },
  soldOut: {
    marginLeft: spacing.sm,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.danger,
  },
});
