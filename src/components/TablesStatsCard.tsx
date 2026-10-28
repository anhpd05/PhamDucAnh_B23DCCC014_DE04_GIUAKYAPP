import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, shadow } from '../theme/typography';
import { formatMoney } from '../utils/format';

type Props = { busy: number; free: number; subtotal: number };

export default function TablesStatsCard({ busy, free, subtotal }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.col}>
        <Text style={[styles.big, styles.busy]}>{busy}</Text>
        <Text style={styles.label}>Có khách</Text>
      </View>
      <View style={styles.col}>
        <Text style={styles.big}>{free}</Text>
        <Text style={styles.label}>Bàn trống</Text>
      </View>
      <View style={styles.wide}>
        <Text style={styles.big} numberOfLines={1} adjustsFontSizeToFit>
          {formatMoney(subtotal)}
        </Text>
        <Text style={styles.label}>Tạm tính đang mở</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: radius.table,
    padding: 16,
    marginBottom: 14,
    ...shadow,
  },
  col: { flex: 1 },
  wide: { flex: 1.5 },
  big: { fontSize: fontSize.big, fontWeight: fontWeight.bold, color: colors.text },
  busy: { color: colors.primary },
  label: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
});
