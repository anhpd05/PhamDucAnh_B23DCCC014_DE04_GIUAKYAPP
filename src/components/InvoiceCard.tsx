import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { InvoiceCalc } from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import Card from './Card';
import InvoiceLineRow from './InvoiceLineRow';
import TotalRow from './TotalRow';

type Props = { tableNumber: number; createdAt?: string; calc: InvoiceCalc };

export default function InvoiceCard({ tableNumber, createdAt, calc }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.table}>{`Bàn ${tableNumber}`}</Text>
        {createdAt ? <Text style={styles.time}>{createdAt}</Text> : null}
      </View>
      <View style={styles.headRow}>
        <Text style={[styles.head, styles.headName]}>Món · Đơn giá</Text>
        <Text style={[styles.head, styles.headQty]}>SL</Text>
        <Text style={[styles.head, styles.headTotal]}>Thành tiền</Text>
      </View>
      {calc.lines.length === 0 ? (
        <Text style={styles.empty}>Hoá đơn chưa có món nào.</Text>
      ) : (
        calc.lines.map(l => <InvoiceLineRow key={l.dishId} line={l} />)
      )}
      <View style={styles.totals}>
        <TotalRow label="Tạm tính" amount={calc.subtotal} />
        <TotalRow label="VAT (8%)" amount={calc.vat} />
        <TotalRow label="Tổng cộng" amount={calc.total} strong />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 12 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  table: { fontSize: fontSize.header, fontWeight: fontWeight.semibold, color: colors.text },
  time: { fontSize: fontSize.small, color: colors.textSub },
  headRow: {
    flexDirection: 'row',
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  head: {
    fontSize: fontSize.tiny,
    fontWeight: fontWeight.semibold,
    color: colors.textSub,
    textTransform: 'uppercase',
  },
  headName: { flex: 1 },
  headQty: { width: 36, textAlign: 'center' },
  headTotal: { width: 96, textAlign: 'right' },
  empty: { paddingVertical: 12, fontSize: fontSize.body, color: colors.textSub },
  totals: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: colors.border },
});
