import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/typography';
import { CATEGORIES, type Category } from '../types';

type Props = { value: Category; onChange: (category: Category) => void };

export default function CategoryPicker({ value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Loại món</Text>
      <View style={styles.row}>
        {CATEGORIES.map(category => {
          const selected = category === value;
          return (
            <Pressable
              key={category}
              onPress={() => onChange(category)}
              style={({ pressed }) => [
                styles.chip,
                selected && styles.chipSelected,
                pressed && styles.chipPressed,
              ]}>
              <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.xl },
  label: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  row: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipPressed: { opacity: 0.7 },
  chipText: { fontSize: fontSize.small, color: colors.text },
  chipTextSelected: { color: colors.onPrimary, fontWeight: fontWeight.bold },
});
