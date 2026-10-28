import React from 'react';
import { Pressable, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, shadow } from '../theme/typography';
import type { Dish } from '../types';
import { formatMoney } from '../utils/format';

type Props = {
  dish: Dish;
  onPress: () => void;
  onLongPress: () => void;
  onToggle: () => void;
};

export default function DishRow({ dish, onPress, onLongPress, onToggle }: Props) {
  const soldOut = !dish.available;
  return (
    <View style={styles.card}>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={500}
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}>
        <View style={soldOut && styles.dim}>
          <Text style={styles.name}>{dish.name}</Text>
          <Text style={styles.price}>{formatMoney(dish.price)}</Text>
        </View>
        {soldOut ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Hết món</Text>
          </View>
        ) : null}
      </Pressable>
      <Switch
        value={dish.available}
        onValueChange={onToggle}
        trackColor={{ false: colors.borderStrong, true: colors.primary }}
        thumbColor={colors.white}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.card,
    marginBottom: 10,
    paddingRight: 12,
    ...shadow,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: radius.card,
  },
  pressed: { backgroundColor: colors.surfaceAlt, transform: [{ scale: 0.985 }] },
  dim: { opacity: 0.45 },
  name: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  price: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.primary, marginTop: 2 },
  badge: { backgroundColor: colors.dangerSoft, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  badgeText: { fontSize: fontSize.tiny, fontWeight: fontWeight.semibold, color: colors.danger },
});
