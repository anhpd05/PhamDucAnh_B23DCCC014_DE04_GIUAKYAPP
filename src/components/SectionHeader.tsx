import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, spacing } from '../theme/typography';

export default function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    backgroundColor: colors.background,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
});
