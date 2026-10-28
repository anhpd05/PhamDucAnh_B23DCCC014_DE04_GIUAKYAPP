import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius } from '../theme/typography';
import { formatMoney, groupDigits } from '../utils/format';
import Card from './Card';

type Props = {
  cashText: string;
  onChange: (digits: string) => void;
  total: number;
};

export default function CashCard({ cashText, onChange, total }: Props) {
  const cash = cashText === '' ? 0 : Number(cashText);
  const entered = cashText !== '';
  const short = entered && cash < total;
  const enough = entered && cash >= total;

  return (
    <Card style={styles.card}>
      <Text style={styles.label}>Tiền khách đưa</Text>
      <View style={[styles.inputBox, short ? styles.inputShort : styles.inputOk]}>
        <TextInput
          value={groupDigits(cashText)}
          onChangeText={t => onChange(t.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 10))}
          keyboardType="numeric"
          placeholder="0"
          placeholderTextColor={colors.placeholder}
          style={styles.input}
        />
        <Text style={styles.suffix}>đ</Text>
      </View>
      {short ? <Text style={styles.error}>{`Khách đưa còn thiếu ${formatMoney(total - cash)}`}</Text> : null}
      <View style={[styles.change, enough ? styles.changeOk : styles.changeOff]}>
        <Text style={styles.changeLabel}>Tiền thừa</Text>
        <Text style={[styles.changeValue, enough ? styles.changeValueOk : styles.changeValueOff]}>
          {enough ? formatMoney(cash - total) : '—'}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16 },
  label: { fontSize: 14, fontWeight: fontWeight.semibold, color: colors.textMuted, marginBottom: 6 },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    borderRadius: radius.input,
    borderWidth: 1.5,
    paddingHorizontal: 14,
    backgroundColor: colors.card,
  },
  inputOk: { borderColor: colors.border },
  inputShort: { borderColor: colors.danger },
  input: { flex: 1, fontSize: 22, fontWeight: fontWeight.semibold, color: colors.text, padding: 0 },
  suffix: { fontSize: 22, color: colors.textSub, marginLeft: 8 },
  error: { fontSize: fontSize.small, color: colors.danger, marginTop: 6 },
  change: {
    marginTop: 12,
    borderRadius: radius.input,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeOk: { backgroundColor: colors.primarySoft },
  changeOff: { backgroundColor: colors.background },
  changeLabel: { fontSize: fontSize.body, color: colors.textMuted },
  changeValue: { fontSize: 22, fontWeight: fontWeight.bold },
  changeValueOk: { color: colors.primary },
  changeValueOff: { color: colors.placeholder },
});
