import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/typography';

type Props = {
  quantity: number;
  canIncrease: boolean;
  canDecrease: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
};

function StepButton({
  label,
  enabled,
  onPress,
}: {
  label: string;
  enabled: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      disabled={!enabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        !enabled && styles.buttonDisabled,
        pressed && enabled && styles.buttonPressed,
      ]}>
      <Text style={[styles.buttonText, !enabled && styles.buttonTextDisabled]}>{label}</Text>
    </Pressable>
  );
}

export default function QuantityStepper({
  quantity,
  canIncrease,
  canDecrease,
  onIncrease,
  onDecrease,
}: Props) {
  return (
    <View style={styles.row}>
      <StepButton label="−" enabled={canDecrease} onPress={onDecrease} />
      <Text style={styles.quantity}>{quantity}</Text>
      <StepButton label="+" enabled={canIncrease} onPress={onIncrease} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  button: {
    width: 40,
    height: 40,
    borderRadius: radius.sm,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { backgroundColor: colors.primaryPressed },
  buttonDisabled: { backgroundColor: colors.disabled },
  buttonText: { fontSize: fontSize.heading, fontWeight: fontWeight.bold, color: colors.onPrimary },
  buttonTextDisabled: { color: colors.disabledText },
  quantity: {
    minWidth: 36,
    textAlign: 'center',
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginHorizontal: spacing.xs,
  },
});
