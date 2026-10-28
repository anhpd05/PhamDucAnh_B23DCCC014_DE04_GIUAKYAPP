import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import TablesStatsCard from '../../components/TablesStatsCard';
import TableTile from '../../components/TableTile';
import type { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../store/AppContext';
import { calcInvoice, getActiveInvoice } from '../../store/selectors';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight } from '../../theme/typography';
import { TABLE_COUNT } from '../../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const TABLES = Array.from({ length: TABLE_COUNT }, (_, i) => i + 1);

export default function TablesTab() {
  const { state } = useApp();
  const navigation = useNavigation<Nav>();

  const info = useMemo(
    () =>
      TABLES.map(n => {
        const invoice = getActiveInvoice(state.invoices, n);
        const calc = calcInvoice(invoice, state.dishes);
        return { n, busy: invoice !== undefined, count: calc.count, subtotal: calc.subtotal };
      }),
    [state.invoices, state.dishes],
  );
  const busyCount = info.filter(t => t.busy).length;
  const openSubtotal = info.reduce((sum, t) => sum + t.subtotal, 0);

  const header = (
    <View>
      <View style={styles.head}>
        <Text style={styles.title}>Sơ đồ bàn</Text>
        <Text style={styles.subtitle}>Chạm vào bàn để gọi món hoặc gọi thêm</Text>
      </View>
      <TablesStatsCard busy={busyCount} free={TABLE_COUNT - busyCount} subtotal={openSubtotal} />
    </View>
  );

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
      numColumns={2}
      data={info}
      keyExtractor={t => String(t.n)}
      ListHeaderComponent={header}
      renderItem={({ item }) => (
        <TableTile
          tableNumber={item.n}
          busy={item.busy}
          count={item.count}
          subtotal={item.subtotal}
          onPress={() => navigation.navigate('Order', { tableNumber: item.n })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 12 },
  row: { gap: 12, marginBottom: 12 },
  head: { paddingTop: 4, paddingBottom: 12 },
  title: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text },
  subtitle: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
});
