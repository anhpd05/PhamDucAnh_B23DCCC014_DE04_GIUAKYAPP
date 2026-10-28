import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo } from 'react';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import DishRow from '../../components/DishRow';
import EmptyState from '../../components/EmptyState';
import MenuStatsCard from '../../components/MenuStatsCard';
import SectionHeader from '../../components/SectionHeader';
import type { RootStackParamList } from '../../navigation/types';
import { useApp } from '../../store/AppContext';
import { busyTables, findActiveInvoiceWithDish, groupByCategory } from '../../store/selectors';
import { colors } from '../../theme/colors';
import { fontSize, fontWeight } from '../../theme/typography';
import type { Dish } from '../../types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function MenuTab({ onGoTables }: { onGoTables: () => void }) {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<Nav>();

  const sections = useMemo(() => groupByCategory(state.dishes), [state.dishes]);
  const soldOut = useMemo(() => state.dishes.filter(d => !d.available).length, [state.dishes]);
  const busy = useMemo(() => busyTables(state.invoices), [state.invoices]);

  const handleLongPress = (dish: Dish) => {
    const invoice = findActiveInvoiceWithDish(state.invoices, dish.id);
    if (invoice) {
      Alert.alert(
        'Không thể xoá món',
        `“${dish.name}” đang có trong hoá đơn đang phục vụ của Bàn ${invoice.tableNumber}.`,
        [{ text: 'Đã hiểu' }],
      );
      return;
    }
    Alert.alert('Xoá món?', `Bạn có chắc muốn xoá “${dish.name}” khỏi thực đơn?`, [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => dispatch({ type: 'DELETE_DISH', dishId: dish.id }),
      },
    ]);
  };

  const header = (
    <View>
      <View style={styles.head}>
        <View style={styles.headText}>
          <Text style={styles.title}>Thực đơn</Text>
          <Text style={styles.subtitle}>Chạm để sửa · Nhấn giữ để xoá</Text>
        </View>
        <AppButton
          title="+ Thêm món"
          small
          onPress={() => navigation.navigate('DishForm', {})}
          style={styles.addBtn}
        />
      </View>
      <MenuStatsCard
        total={state.dishes.length}
        soldOut={soldOut}
        busy={busy}
        onPressTables={onGoTables}
      />
    </View>
  );

  return (
    <SectionList
      style={styles.list}
      contentContainerStyle={styles.content}
      sections={sections}
      keyExtractor={d => d.id}
      ListHeaderComponent={header}
      ListEmptyComponent={
        <EmptyState title="Chưa có món nào" description="Nhấn “+ Thêm món” để tạo món đầu tiên." />
      }
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section }) => (
        <SectionHeader title={section.title} right={`${section.data.length} món`} />
      )}
      renderItem={({ item }) => (
        <DishRow
          dish={item}
          onPress={() => navigation.navigate('DishForm', { dishId: item.id })}
          onLongPress={() => handleLongPress(item)}
          onToggle={() => dispatch({ type: 'TOGGLE_AVAILABLE', dishId: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 20, paddingBottom: 12 },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
    paddingBottom: 12,
    gap: 14,
  },
  headText: { flex: 1 },
  title: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.text },
  subtitle: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
  addBtn: { height: 40 },
});
