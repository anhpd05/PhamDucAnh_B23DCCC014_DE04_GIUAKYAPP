import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, spacing } from '../theme/typography';

type Props = Pick<TextInputProps, 'value' | 'onChangeText' | 'keyboardType' | 'placeholder'> & {
  label: string;
  error?: string;
};

export default function FormField({ label, error, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...inputProps}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.lg },
  label: {
    fontSize: fontSize.small,
    fontWeight: fontWeight.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.body,
    color: colors.text,
  },
  inputError: { borderColor: colors.danger, borderWidth: 2 },
  error: { marginTop: spacing.xs, fontSize: fontSize.caption, color: colors.danger },
});
