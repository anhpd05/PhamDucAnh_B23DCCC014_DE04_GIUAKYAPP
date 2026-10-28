import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useMemo } from 'react';
import { Alert, SectionList, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import TableMapHeaderButton from '../components/TableMapHeaderButton';
import DishRow from '../components/DishRow';
import EmptyState from '../components/EmptyState';
import ScreenContainer from '../components/ScreenContainer';
import SectionHeader from '../components/SectionHeader';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { busyTableCount, groupByCategory, isDishInActiveInvoice } from '../store/selectors';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';
import { TABLE_COUNT, type Dish } from '../types';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Menu'>;

export default function MenuScreen() {
  const navigation = useNavigation<Nav>();
  const { state, dispatch } = useApp();
  const sections = useMemo(() => groupByCategory(state.dishes), [state.dishes]);
  const busy = busyTableCount(state.invoices);

  useLayoutEffect(() => {
    navigation.setOptions({ headerRight: TableMapHeaderButton });
  }, [navigation]);

  const handleLongPress = (dish: Dish) => {
    if (isDishInActiveInvoice(state.invoices, dish.id)) {
      Alert.alert(
        'Không thể xoá',
        `"${dish.name}" đang có trong hoá đơn của bàn đang phục vụ.`,
      );
      return;
    }
    Alert.alert('Xoá món', `Bạn có chắc muốn xoá "${dish.name}"?`, [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => dispatch({ type: 'DELETE_DISH', dishId: dish.id }),
      },
    ]);
  };

  return (
    <ScreenContainer>
      <Text style={styles.stats}>
        {state.dishes.length} món · {busy}/{TABLE_COUNT} bàn có khách
      </Text>
      <SectionList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        sections={sections}
        keyExtractor={dish => dish.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => <SectionHeader title={section.title} />}
        renderItem={({ item }) => (
          <DishRow
            dish={item}
            onPress={() => navigation.navigate('DishForm', { dishId: item.id })}
            onLongPress={() => handleLongPress(item)}
            onToggle={() => dispatch({ type: 'TOGGLE_AVAILABLE', dishId: item.id })}
          />
        )}
        ListEmptyComponent={<EmptyState message="Chưa có món nào" />}
      />
      <View style={styles.footer}>
        <AppButton title="+ Thêm món" onPress={() => navigation.navigate('DishForm', {})} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stats: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.medium,
    color: colors.textMuted,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  list: { flex: 1 },
  listContent: { paddingHorizontal: spacing.lg, flexGrow: 1 },
  footer: { padding: spacing.lg },
});
