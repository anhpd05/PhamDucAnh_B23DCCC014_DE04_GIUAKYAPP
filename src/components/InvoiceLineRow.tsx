import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import type { InvoiceLine } from '../store/selectors';
import { formatMoney } from '../utils/format';

export default function InvoiceLineRow({ line }: { line: InvoiceLine }) {
  return (
    <View style={styles.row}>
      <Text style={[styles.name, styles.bold]}>{line.name}</Text>
      <Text style={styles.qty}>{line.quantity}</Text>
      <Text style={styles.money}>{formatMoney(line.unitPrice)}</Text>
      <Text style={[styles.money, styles.bold]}>{formatMoney(line.lineTotal)}</Text>
    </View>
  );
}

export function InvoiceHeaderRow() {
  return (
    <View style={styles.row}>
      <Text style={[styles.name, styles.head]}>Tên món</Text>
      <Text style={[styles.qty, styles.head]}>SL</Text>
      <Text style={[styles.money, styles.head]}>Đơn giá</Text>
      <Text style={[styles.money, styles.head]}>Thành tiền</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.xs },
  name: { flex: 2, fontSize: fontSize.small, color: colors.text },
  qty: { width: 32, textAlign: 'center', fontSize: fontSize.small, color: colors.text },
  money: { flex: 1.4, textAlign: 'right', fontSize: fontSize.small, color: colors.text },
  bold: { fontWeight: fontWeight.bold },
  head: { fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.textMuted },
});
