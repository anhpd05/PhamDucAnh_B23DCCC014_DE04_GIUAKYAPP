import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import { formatMoney } from '../utils/format';

type Props = { label: string; amount: number; emphasis?: boolean };

export default function TotalRow({ label, amount, emphasis = false }: Props) {
  return (
    <View style={styles.row}>
      <Text style={emphasis ? styles.labelBig : styles.label}>{label}</Text>
      <Text style={emphasis ? styles.amountBig : styles.amount}>{formatMoney(amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: { fontSize: fontSize.body, color: colors.textMuted },
  amount: { fontSize: fontSize.body, color: colors.text },
  labelBig: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text },
  amountBig: { fontSize: fontSize.display, fontWeight: fontWeight.bold, color: colors.primary },
});
