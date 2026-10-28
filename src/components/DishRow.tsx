import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import type { Dish } from '../types';
import { formatMoney } from '../utils/format';
import Card from './Card';

type Props = {
  dish: Dish;
  onPress: () => void;
  onLongPress: () => void;
  onToggle: () => void;
};

export default function DishRow({ dish, onPress, onLongPress, onToggle }: Props) {
  return (
    <Card style={[styles.card, !dish.available && styles.unavailable]}>
      <Pressable
        style={({ pressed }) => [styles.info, pressed && styles.pressed]}
        onPress={onPress}
        onLongPress={onLongPress}>
        <Text style={styles.name}>{dish.name}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.price}>{formatMoney(dish.price)}</Text>
          {!dish.available && <Text style={styles.soldOut}>Hết món</Text>}
        </View>
      </Pressable>
      <Switch
        value={dish.available}
        onValueChange={onToggle}
        trackColor={{ false: colors.disabled, true: colors.primary }}
        thumbColor={colors.surface}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  unavailable: { opacity: 0.5 },
  info: { flex: 1, paddingRight: spacing.md },
  pressed: { opacity: 0.6 },
  name: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  price: { fontSize: fontSize.small, color: colors.textMuted },
  soldOut: {
    marginLeft: spacing.sm,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    color: colors.danger,
  },
});
