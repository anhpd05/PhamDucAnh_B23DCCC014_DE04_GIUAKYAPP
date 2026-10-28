import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, shadow } from '../theme/typography';
import { TABLE_COUNT } from '../types';

type Props = {
  total: number;
  soldOut: number;
  busy: Set<number>;
  onPressTables: () => void;
};

const TABLE_NUMBERS = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

export default function MenuStatsCard({ total, soldOut, busy, onPressTables }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.col}>
        <Text style={styles.big}>{total}</Text>
        <Text style={styles.label}>món trong thực đơn</Text>
        <Text style={[styles.status, soldOut > 0 ? styles.statusBad : styles.statusOk]}>
          {soldOut > 0 ? `${soldOut} món đang hết` : 'Tất cả còn phục vụ'}
        </Text>
      </View>
      <Pressable style={styles.col} onPress={onPressTables}>
        <Text style={styles.big}>
          <Text style={styles.busy}>{busy.size}</Text>
          <Text style={styles.of}>/10</Text>
          <Text style={styles.of}> ›</Text>
        </Text>
        <Text style={styles.label}>bàn có khách</Text>
        <View style={styles.bars}>
          {TABLE_NUMBERS.map(n => (
            <View key={n} style={[styles.bar, busy.has(n) && styles.barBusy]} />
          ))}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 4,
    ...shadow,
  },
  col: { flex: 1 },
  big: { fontSize: fontSize.big, fontWeight: fontWeight.bold, color: colors.text },
  busy: { color: colors.primary },
  of: { color: colors.placeholder },
  label: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
  status: { fontSize: fontSize.small, marginTop: 6, fontWeight: fontWeight.semibold },
  statusBad: { color: colors.danger },
  statusOk: { color: colors.textSub },
  bars: { flexDirection: 'row', gap: 3, marginTop: 8 },
  bar: { flex: 1, height: 6, borderRadius: 3, backgroundColor: colors.border },
  barBusy: { backgroundColor: colors.primary },
});
