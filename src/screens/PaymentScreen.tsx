import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text } from 'react-native';
import AppButton from '../components/AppButton';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import FormField from '../components/FormField';
import InvoiceLineRow, { InvoiceHeaderRow } from '../components/InvoiceLineRow';
import ScreenContainer from '../components/ScreenContainer';
import TotalRow from '../components/TotalRow';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { calcTotals, getActiveInvoice, invoiceLines, subtotalOf } from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import { formatMoney } from '../utils/format';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

export default function PaymentScreen() {
  const navigation = useNavigation<Nav>();
  const { tableNumber } = useRoute<RouteProp<RootStackParamList, 'Payment'>>().params;
  const { state, dispatch } = useApp();
  const [cashText, setCashText] = useState('');
  // Keeps the paid invoice on screen until navigation closes this screen.
  const [paidInvoice, setPaidInvoice] = useState<ReturnType<typeof getActiveInvoice>>();

  const invoice = paidInvoice ?? getActiveInvoice(state.invoices, tableNumber);
  const lines = invoice ? invoiceLines(invoice, state.dishes) : [];
  const totals = calcTotals(subtotalOf(lines));
  const cash = Number(cashText || 0);
  const canPay = lines.length > 0 && cash >= totals.total;
  const change = cash - totals.total;

  const onConfirm = () => {
    if (!invoice || !canPay) {
      return;
    }
    setPaidInvoice(invoice);
    dispatch({ type: 'PAY', invoiceId: invoice.id });
    Alert.alert(
      'Thanh toán thành công',
      `Bàn ${tableNumber} · Tổng ${formatMoney(totals.total)} · Tiền thừa ${formatMoney(change)}`,
      [{ text: 'OK', onPress: () => navigation.popTo('TableMap') }],
      { cancelable: false },
    );
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Card style={styles.card}>
            {lines.length === 0 ? (
              <EmptyState message="Hoá đơn chưa có món nào" />
            ) : (
              <>
                <InvoiceHeaderRow />
                {lines.map(line => (
                  <InvoiceLineRow key={line.dishId} line={line} />
                ))}
              </>
            )}
          </Card>
          <Card style={styles.card}>
            <TotalRow label="Tạm tính" amount={totals.subtotal} />
            <TotalRow label="VAT 8%" amount={totals.vat} />
            <TotalRow label="Tổng cộng" amount={totals.total} emphasis />
          </Card>
          <FormField
            label="Tiền khách đưa"
            value={cashText}
            onChangeText={text => setCashText(text.replace(/\D/g, ''))}
            keyboardType="numeric"
            placeholder="Ví dụ: 200000"
          />
          {cashText !== '' && lines.length > 0 && (
            <Text style={[styles.change, change < 0 && styles.short]}>
              {change >= 0
                ? `Tiền thừa: ${formatMoney(change)}`
                : `Còn thiếu: ${formatMoney(-change)}`}
            </Text>
          )}
          <AppButton title="Xác nhận thanh toán" onPress={onConfirm} disabled={!canPay} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg },
  card: { marginBottom: spacing.lg },
  change: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.success,
    marginBottom: spacing.lg,
  },
  short: { color: colors.danger },
});
