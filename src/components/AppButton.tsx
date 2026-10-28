import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/typography';

type Variant = 'primary' | 'outline' | 'danger';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        variantStyles[variant],
        pressed && pressedStyles[variant],
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          variant === 'outline' && styles.outlineText,
          disabled && styles.disabledText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
    color: colors.onPrimary,
  },
  outlineText: {
    color: colors.primary,
  },
  disabled: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.disabledText,
  },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  outline: { backgroundColor: colors.surface, borderColor: colors.primary },
  danger: { backgroundColor: colors.danger, borderColor: colors.danger },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primaryPressed, borderColor: colors.primaryPressed },
  outline: { backgroundColor: colors.tableBusy },
  danger: { backgroundColor: colors.dangerPressed, borderColor: colors.dangerPressed },
});
