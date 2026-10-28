import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';

type Props = {
  title: string;
  right: string;
  rightAccent?: boolean;
  onPress?: () => void;
};

export default function SectionHeader({ title, right, rightAccent = false, onPress }: Props) {
  return (
    <Pressable disabled={!onPress} onPress={onPress} style={styles.row}>
      <Text style={styles.title}>{title.toUpperCase()}</Text>
      <View>
        <Text style={[styles.right, rightAccent && styles.rightAccent]}>{right}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.bold,
    color: colors.textMuted,
    letterSpacing: 0.6,
  },
  right: { fontSize: fontSize.small, color: colors.textSub },
  rightAccent: { color: colors.primary, fontWeight: fontWeight.semibold },
});
