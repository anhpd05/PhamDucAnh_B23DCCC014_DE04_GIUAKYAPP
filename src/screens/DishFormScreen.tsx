import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import CategoryPicker from '../components/CategoryPicker';
import FormField from '../components/FormField';
import ScreenContainer from '../components/ScreenContainer';
import ScreenHeader from '../components/ScreenHeader';
import SwitchCard from '../components/SwitchCard';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { colors } from '../theme/colors';
import type { Category } from '../types';
import { formatMoney } from '../utils/format';
import { validateDish } from '../utils/validation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DishForm'>;

export default function DishFormScreen() {
  const { state, dispatch } = useApp();
  const navigation = useNavigation<Nav>();
  const { params } = useRoute<RouteProp<RootStackParamList, 'DishForm'>>();
  const dishId = params?.dishId;
  const editing = dishId ? state.dishes.find(d => d.id === dishId) : undefined;

  const [name, setName] = useState(editing?.name ?? '');
  const [category, setCategory] = useState<Category>(editing?.category ?? 'Khai vị');
  const [price, setPrice] = useState(editing ? String(editing.price) : '');
  const [available, setAvailable] = useState(editing?.available ?? true);
  const [touched, setTouched] = useState({ name: false, price: false });

  useEffect(() => {
    if (dishId && !editing) {
      navigation.goBack();
    }
  }, [dishId, editing, navigation]);

  const errors = useMemo(
    () => validateDish({ id: dishId, name, price }, state.dishes),
    [dishId, name, price, state.dishes],
  );

  const priceHint = errors.price
    ? 'Số dương, bội số của 1.000'
    : `Hiển thị: ${formatMoney(Number(price))}`;

  const onSave = () => {
    if (errors.name || errors.price) {
      setTouched({ name: true, price: true });
      return;
    }
    dispatch({
      type: 'SAVE_DISH',
      id: dishId,
      name: name.trim(),
      category,
      price: Number(price),
      available,
    });
    navigation.goBack();
  };

  return (
    <ScreenContainer whiteFooter>
      <ScreenHeader
        title={dishId ? 'Sửa món' : 'Thêm món'}
        backLabel="Thực đơn"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView behavior="padding" style={styles.flex}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">
          <FormField
            label="Tên món"
            required
            value={name}
            onChangeText={t => {
              setName(t);
              setTouched(s => ({ ...s, name: true }));
            }}
            placeholder="VD: Gỏi cuốn tôm thịt"
            error={touched.name ? errors.name : undefined}
          />
          <CategoryPicker value={category} onChange={setCategory} />
          <FormField
            label="Giá bán (VNĐ)"
            required
            value={price}
            onChangeText={t => {
              setPrice(t);
              setTouched(s => ({ ...s, price: true }));
            }}
            keyboardType="numeric"
            suffix="đ"
            placeholder="VD: 45000"
            error={touched.price ? errors.price : undefined}
            hint={priceHint}
          />
          <SwitchCard
            title="Còn phục vụ"
            description="Tắt nếu món đã hết trong ngày"
            value={available}
            onChange={setAvailable}
          />
        </ScrollView>
        <View style={styles.footer}>
          <AppButton title={dishId ? 'Lưu thay đổi' : 'Thêm món'} onPress={onSave} />
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
});
