import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import type { RootStackParamList } from '../navigation/types';
import AppButton from './AppButton';

export default function TableMapHeaderButton() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <AppButton
      title="Sơ đồ bàn"
      variant="outline"
      onPress={() => navigation.navigate('TableMap')}
    />
  );
}
