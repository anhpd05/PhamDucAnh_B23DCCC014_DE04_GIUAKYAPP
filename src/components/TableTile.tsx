import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius } from '../theme/typography';
import { formatMoney } from '../utils/format';
import StatusChip from './StatusChip';

type Props = {
  tableNumber: number;
  busy: boolean;
  count: number;
  subtotal: number;
  onPress: () => void;
};

export default function TableTile({ tableNumber, busy, count, subtotal, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.tile,
        busy ? styles.tileBusy : styles.tileFree,
        pressed && styles.pressed,
      ]}>
      <View style={styles.top}>
        <Text style={[styles.tableWord, busy && styles.whiteText]}>BÀN</Text>
        <StatusChip label={busy ? 'Có khách' : 'Trống'} tone={busy ? 'busy' : 'free'} />
      </View>
      <Text style={[styles.number, busy && styles.whiteText]}>
        {String(tableNumber).padStart(2, '0')}
      </Text>
      <Text style={[styles.foot, busy && styles.footBusy]}>
        {busy ? `${count} món · ${formatMoney(subtotal)}` : 'Chạm để gọi món'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minHeight: 112,
    borderRadius: radius.table,
    borderWidth: 1.5,
    padding: 12,
    justifyContent: 'space-between',
  },
  tileFree: { backgroundColor: colors.card, borderColor: colors.border },
  tileBusy: { backgroundColor: colors.primary, borderColor: colors.primary },
  pressed: { transform: [{ scale: 0.96 }] },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tableWord: { fontSize: fontSize.small, fontWeight: fontWeight.semibold, color: colors.textSub },
  whiteText: { color: colors.white },
  number: { fontSize: 32, fontWeight: fontWeight.bold, color: colors.text },
  foot: { fontSize: fontSize.small, color: colors.textSub },
  footBusy: { color: colors.onPrimarySub },
});
