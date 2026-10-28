import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, radius } from '../theme/typography';
import { CATEGORIES, type Category } from '../types';

type Props = { value: Category; onChange: (c: Category) => void };

export default function CategoryPicker({ value, onChange }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Loại món</Text>
      <View style={styles.grid}>
        {CATEGORIES.map(c => {
          const selected = c === value;
          return (
            <Pressable
              key={c}
              onPress={() => onChange(c)}
              style={({ pressed }) => [
                styles.item,
                selected ? styles.itemOn : styles.itemOff,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.text, selected && styles.textOn]}>{c}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: fontWeight.semibold, color: colors.textMuted, marginBottom: 6 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  item: {
    width: '48%',
    flexGrow: 1,
    height: 46,
    borderRadius: radius.input,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  itemOff: { backgroundColor: colors.card, borderColor: colors.border },
  pressed: { transform: [{ scale: 0.96 }] },
  text: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.text },
  textOn: { color: colors.white },
});
