import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = { children: React.ReactNode };

export default function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
