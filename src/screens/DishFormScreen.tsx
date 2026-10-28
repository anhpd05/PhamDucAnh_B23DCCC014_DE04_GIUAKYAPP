import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import CategoryPicker from '../components/CategoryPicker';
import FormField from '../components/FormField';
import ScreenContainer from '../components/ScreenContainer';
import type { RootStackParamList } from '../navigation/types';
import { useApp } from '../store/AppContext';
import { spacing } from '../theme/typography';
import type { Category } from '../types';
import { createId } from '../utils/id';
import { validateDish, type DishErrors } from '../utils/validation';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DishForm'>;

export default function DishFormScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<RouteProp<RootStackParamList, 'DishForm'>>();
  const { state, dispatch } = useApp();
  const dishId = route.params?.dishId;
  const editing = dishId ? state.dishes.find(d => d.id === dishId) : undefined;

  const [name, setName] = useState(editing?.name ?? '');
  const [price, setPrice] = useState(editing ? String(editing.price) : '');
  const [category, setCategory] = useState<Category>(editing?.category ?? 'Khai vị');
  const [errors, setErrors] = useState<DishErrors>({});

  useEffect(() => {
    if (dishId && !editing) {
      navigation.goBack();
    }
  }, [dishId, editing, navigation]);

  const onSave = () => {
    const found = validateDish({ name, price }, state.dishes, dishId);
    setErrors(found);
    if (found.name || found.price) {
      return;
    }
    const payload = { name: name.trim(), category, price: Number(price.trim()) };
    if (dishId) {
      dispatch({ type: 'UPDATE_DISH', id: dishId, ...payload });
    } else {
      dispatch({ type: 'ADD_DISH', id: createId(), ...payload });
    }
    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <FormField
            label="Tên món"
            value={name}
            onChangeText={text => {
              setName(text);
              setErrors(prev => ({ ...prev, name: undefined }));
            }}
            error={errors.name}
            placeholder="Ví dụ: Bún chả"
          />
          <FormField
            label="Giá (VNĐ)"
            value={price}
            onChangeText={text => {
              setPrice(text);
              setErrors(prev => ({ ...prev, price: undefined }));
            }}
            error={errors.price}
            keyboardType="numeric"
            placeholder="Ví dụ: 45000"
          />
          <CategoryPicker value={category} onChange={setCategory} />
          <AppButton title={dishId ? 'Cập nhật' : 'Lưu'} onPress={onSave} />
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: spacing.lg },
});
