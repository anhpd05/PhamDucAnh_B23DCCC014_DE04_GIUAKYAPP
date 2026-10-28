import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/typography';

type Props = { title: string; description?: string };

export default function EmptyState({ title, description }: Props) {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.desc}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    margin: spacing.xl,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
    borderRadius: radius.table,
  },
  title: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  desc: { marginTop: spacing.xs, fontSize: fontSize.small, color: colors.textSub, textAlign: 'center' },
});
