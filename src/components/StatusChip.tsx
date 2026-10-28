import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius } from '../theme/typography';

type Tone = 'free' | 'busy' | 'serving';

const toneStyles = StyleSheet.create({
  free: { backgroundColor: colors.background },
  busy: { backgroundColor: colors.whiteSoft },
  serving: { backgroundColor: colors.warningSoft },
});

const textStyles = StyleSheet.create({
  free: { color: colors.textSub },
  busy: { color: colors.white },
  serving: { color: colors.warning },
});

export default function StatusChip({ label, tone }: { label: string; tone: Tone }) {
  return (
    <View style={[styles.chip, toneStyles[tone]]}>
      <Text style={[styles.text, textStyles[tone]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  text: { fontSize: fontSize.tiny, fontWeight: fontWeight.semibold },
});
