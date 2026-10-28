import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { fontSize, fontWeight } from '../theme/typography';
import Card from './Card';

type Props = {
  title: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
};

export default function SwitchCard({ title, description, value, onChange }: Props) {
  return (
    <Card style={styles.card}>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.borderStrong, true: colors.primary }}
        thumbColor={colors.white}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  text: { flex: 1 },
  title: { fontSize: fontSize.name, fontWeight: fontWeight.semibold, color: colors.text },
  desc: { fontSize: fontSize.small, color: colors.textSub, marginTop: 2 },
});
