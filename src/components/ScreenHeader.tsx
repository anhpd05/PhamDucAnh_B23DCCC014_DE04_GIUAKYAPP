import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';

type Props = { title: string; backLabel: string; onBack: () => void };

export default function ScreenHeader({ title, backLabel, onBack }: Props) {
  return (
    <View style={styles.bar}>
      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        hitSlop={8}
        style={({ pressed }) => [styles.side, pressed && styles.backPressed]}>
        <Text style={styles.backText} numberOfLines={1}>{`‹ ${backLabel}`}</Text>
      </Pressable>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.side} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  side: { width: 104 },
  backPressed: { opacity: 0.5 },
  backText: { color: colors.primary, fontSize: fontSize.body, fontWeight: fontWeight.semibold },
  title: {
    flex: 1,
    textAlign: 'center',
    color: colors.text,
    fontSize: fontSize.header,
    fontWeight: fontWeight.semibold,
  },
});
