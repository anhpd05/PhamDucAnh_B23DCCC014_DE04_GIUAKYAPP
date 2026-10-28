import React from 'react';
import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, size } from '../theme/typography';

type Variant = 'primary' | 'outline' | 'soft';

type Props = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  small?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({
  title,
  onPress,
  variant = 'primary',
  small = false,
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
        small ? styles.sm : styles.lg,
        variantStyles[variant],
        pressed && pressedStyles[variant],
        pressed && styles.pressedScale,
        disabled && styles.disabled,
        style,
      ]}>
      <Text
        style={[
          styles.text,
          variant !== 'primary' && styles.textAccent,
          disabled && styles.disabledText,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.input,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 16,
  },
  lg: { height: size.buttonLg },
  sm: { height: size.buttonSm },
  pressedScale: { transform: [{ scale: 0.96 }] },
  text: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.white },
  textAccent: { color: colors.primary },
  disabled: { backgroundColor: colors.disabledBg, borderColor: colors.disabledBg },
  disabledText: { color: colors.disabledText },
});

const variantStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  outline: { backgroundColor: colors.card, borderColor: colors.borderStrong },
  soft: { backgroundColor: colors.primarySoft, borderColor: colors.primarySoft },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primaryDark, borderColor: colors.primaryDark },
  outline: { backgroundColor: colors.surfaceAlt },
  soft: { backgroundColor: colors.tabSubActive, borderColor: colors.tabSubActive },
});
