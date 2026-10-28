import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import type { InvoiceLine } from '../store/selectors';
import { formatMoney } from '../utils/format';

export default function InvoiceLineRow({ line }: { line: InvoiceLine }) {
  return (
    <View style={styles.row}>
      <View style={styles.name}>
        <Text style={styles.nameText}>{line.name}</Text>
        <Text style={styles.unit}>{formatMoney(line.unitPrice)}</Text>
      </View>
      <Text style={styles.qty}>{`×${line.quantity}`}</Text>
      <Text style={styles.total}>{formatMoney(line.lineTotal)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  name: { flex: 1 },
  nameText: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  unit: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
  qty: { width: 36, fontSize: fontSize.body, color: colors.textMuted, textAlign: 'center' },
  total: {
    width: 96,
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    textAlign: 'right',
  },
});
