import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ScreenContainer from '../components/ScreenContainer';
import TableTile from '../components/TableTile';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { getActiveInvoice, invoiceLines, subtotalOf } from '../store/selectors';
import { spacing } from '../theme/typography';
import { TABLE_COUNT } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'TableMap'>;

const TABLES = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

export default function TableMapScreen() {
  const navigation = useNavigation<Nav>();
  const { state } = useApp();

  return (
    <ScreenContainer>
      <FlatList
        data={TABLES}
        keyExtractor={n => String(n)}
        numColumns={2}
        contentContainerStyle={styles.content}
        columnWrapperStyle={styles.column}
        renderItem={({ item }) => {
          const invoice = getActiveInvoice(state.invoices, item);
          const subtotal = invoice ? subtotalOf(invoiceLines(invoice, state.dishes)) : 0;
          return (
            <TableTile
              tableNumber={item}
              busy={invoice !== undefined}
              subtotal={subtotal}
              onPress={() => navigation.navigate('Order', { tableNumber: item })}
            />
          );
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: spacing.lg },
  column: { gap: spacing.md, marginBottom: spacing.md },
});
