import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import { formatMoney } from '../utils/format';
import Card from './Card';

type Props = {
  tableNumber: number;
  busy: boolean;
  subtotal: number;
  onPress: () => void;
};

export default function TableTile({ tableNumber, busy, subtotal, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed]}
      onPress={onPress}>
      <Card style={[styles.card, { backgroundColor: busy ? colors.tableBusy : colors.tableFree }]}>
        <Text style={styles.number}>Bàn {tableNumber}</Text>
        <Text style={[styles.status, busy && styles.statusBusy]}>
          {busy ? 'Có khách' : 'Trống'}
        </Text>
        {busy && <Text style={styles.subtotal}>{formatMoney(subtotal)}</Text>}
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { flex: 1 },
  pressed: { opacity: 0.7 },
  card: { alignItems: 'center', minHeight: 96, justifyContent: 'center' },
  number: { fontSize: fontSize.heading, fontWeight: fontWeight.bold, color: colors.text },
  status: { marginTop: spacing.xs, fontSize: fontSize.small, color: colors.success },
  statusBusy: { color: colors.danger, fontWeight: fontWeight.bold },
  subtotal: { marginTop: spacing.xs, fontSize: fontSize.small, color: colors.textMuted },
});
