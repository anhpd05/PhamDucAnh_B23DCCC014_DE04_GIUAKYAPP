import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontWeight } from '../theme/typography';

type Props = {
  quantity: number;
  canIncrease: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

export default function QuantityStepper({ quantity, canIncrease, onIncrease, onDecrease }: Props) {
  return (
    <View style={styles.row}>
      <Pressable
        accessibilityLabel="Giảm"
        onPress={onDecrease}
        style={({ pressed }) => [styles.btn, styles.minus, pressed && styles.pressed]}>
        <Text style={styles.minusText}>−</Text>
      </Pressable>
      <Text style={styles.qty}>{quantity}</Text>
      <Pressable
        accessibilityLabel="Tăng"
        disabled={!canIncrease}
        onPress={onIncrease}
        style={({ pressed }) => [
          styles.btn,
          canIncrease ? styles.plus : styles.plusOff,
          pressed && styles.pressed,
        ]}>
        <Text style={[styles.plusText, !canIncrease && styles.plusTextOff]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  btn: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  minus: { borderWidth: 1.5, borderColor: colors.borderStrong, backgroundColor: colors.card },
  minusText: { fontSize: 20, color: colors.text, fontWeight: fontWeight.semibold },
  plus: { backgroundColor: colors.primary },
  plusOff: { backgroundColor: colors.disabledBg },
  plusText: { fontSize: 20, color: colors.white, fontWeight: fontWeight.semibold },
  plusTextOff: { color: colors.disabledText },
  pressed: { transform: [{ scale: 0.92 }] },
  qty: { minWidth: 22, textAlign: 'center', fontSize: 17, fontWeight: fontWeight.bold, color: colors.text },
});
