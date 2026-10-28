import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius, size } from '../theme/typography';

type Props = Pick<
  TextInputProps,
  'value' | 'onChangeText' | 'keyboardType' | 'placeholder' | 'onBlur'
> & {
  label: string;
  required?: boolean;
  suffix?: string;
  error?: string;
  hint?: string;
};

export default function FormField({ label, required, suffix, error, hint, ...inputProps }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>
      <View style={[styles.inputBox, error ? styles.inputError : styles.inputOk]}>
        <TextInput
          {...inputProps}
          placeholderTextColor={colors.placeholder}
          style={styles.input}
        />
        {suffix ? <Text style={styles.suffix}>{suffix}</Text> : null}
      </View>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: fontWeight.semibold, color: colors.textMuted, marginBottom: 6 },
  star: { color: colors.danger },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: size.input,
    borderRadius: radius.input,
    borderWidth: 1.5,
    backgroundColor: colors.card,
    paddingHorizontal: 14,
  },
  inputOk: { borderColor: colors.border },
  inputError: { borderColor: colors.danger },
  input: { flex: 1, fontSize: fontSize.name, color: colors.text, padding: 0 },
  suffix: { fontSize: fontSize.name, color: colors.textSub, marginLeft: 8 },
  error: { fontSize: fontSize.small, color: colors.danger, marginTop: 4 },
  hint: { fontSize: fontSize.small, color: colors.textSub, marginTop: 4 },
});
