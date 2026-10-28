import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import CashCard from '../components/CashCard';
import InvoiceCard from '../components/InvoiceCard';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { calcInvoice, getActiveInvoice } from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize } from '../theme/typography';
import { formatMoney } from '../utils/format';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Payment'>;

export default function PaymentScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<Nav>();
  const { tableNumber } = useRoute<RouteProp<RootStackParamList, 'Payment'>>().params;
  const [cashText, setCashText] = useState('');

  const invoice = getActiveInvoice(state.invoices, tableNumber);
  const calc = useMemo(() => calcInvoice(invoice, state.dishes), [invoice, state.dishes]);
  const cash = cashText === '' ? 0 : Number(cashText);
  const hasItems = calc.lines.length > 0;
  const canPay = invoice !== undefined && hasItems && cashText !== '' && cash >= calc.total;

  let hint = '';
  if (!hasItems) {
    hint = 'Hoá đơn chưa có món nào';
  } else if (cashText === '') {
    hint = 'Nhập số tiền khách đưa để thanh toán';
  } else if (cash < calc.total) {
    hint = 'Tiền khách đưa chưa đủ';
  }

  const onConfirm = () => {
    if (!invoice) {
      return;
    }
    Alert.alert('Xác nhận thanh toán', `Bàn ${tableNumber} · Tổng cộng ${formatMoney(calc.total)}`, [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Thanh toán',
        onPress: () => {
          dispatch({ type: 'PAY', invoiceId: invoice.id });
          navigation.popTo('Home', { tab: 'tables' });
        },
      },
    ]);
  };

  return (
    <ScreenContainer whiteFooter>
      <ScreenHeader
        title="Thanh toán"
        backLabel={`Bàn ${tableNumber}`}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.flex}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <InvoiceCard tableNumber={tableNumber} createdAt={invoice?.createdAt} calc={calc} />
          <CashCard cashText={cashText} onChange={setCashText} total={calc.total} />
        </ScrollView>
        <View style={styles.footer}>
          {hint ? <Text style={styles.hint}>{hint}</Text> : null}
          <AppButton title="Xác nhận thanh toán" disabled={!canPay} onPress={onConfirm} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20 },
  footer: {
    padding: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  hint: { fontSize: fontSize.small, color: colors.textSub, marginBottom: 8, textAlign: 'center' },
});
