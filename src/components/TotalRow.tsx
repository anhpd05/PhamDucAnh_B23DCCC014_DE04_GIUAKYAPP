import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import { formatMoney } from '../utils/format';

type Props = { label: string; amount: number; strong?: boolean };

export default function TotalRow({ label, amount, strong = false }: Props) {
  return (
    <View style={[styles.row, strong && styles.rowStrong]}>
      <Text style={strong ? styles.labelStrong : styles.label}>{label}</Text>
      <Text style={strong ? styles.amountStrong : styles.amount}>{formatMoney(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 4 },
  rowStrong: {
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1.5,
    borderTopColor: colors.borderStrong,
    borderStyle: 'dashed',
  },
  label: { fontSize: fontSize.body, color: colors.textMuted },
  amount: { fontSize: fontSize.body, color: colors.textMuted },
  labelStrong: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  amountStrong: { fontSize: fontSize.big, fontWeight: fontWeight.bold, color: colors.primary },
});
