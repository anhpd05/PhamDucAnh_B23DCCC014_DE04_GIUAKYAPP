import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

type Props = { children: React.ReactNode; whiteFooter?: boolean };

export default function ScreenContainer({ children, whiteFooter = false }: Props) {
  return (
    <View style={[styles.root, whiteFooter && styles.rootWhite]}>
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {children}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  rootWhite: { backgroundColor: colors.card },
  container: { flex: 1 },
});
