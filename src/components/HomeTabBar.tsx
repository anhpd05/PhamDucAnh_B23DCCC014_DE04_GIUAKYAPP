import React, { useEffect, useRef, useState } from 'react';
import { Animated, LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import type { HomeTab } from '../navigation/types';
import { colors } from '../theme/colors';
import { fontSize, fontWeight, shadow } from '../theme/typography';

type Props = {
  tab: HomeTab;
  onChange: (tab: HomeTab) => void;
  busyCount: number;
  dishCount: number;
};

export default function HomeTabBar({ tab, onChange, busyCount, dishCount }: Props) {
  const [width, setWidth] = useState(0);
  const slide = useRef(new Animated.Value(tab === 'tables' ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(slide, {
      toValue: tab === 'tables' ? 0 : 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [tab, slide]);

  const half = width / 2;
  const translateX = slide.interpolate({ inputRange: [0, 1], outputRange: [0, half] });
  const onLayout = (e: LayoutChangeEvent) => setWidth(e.nativeEvent.layout.width - PAD * 2);

  return (
    <View style={styles.outer}>
      <View style={styles.bar} onLayout={onLayout}>
        {width > 0 ? (
          <Animated.View
            style={[styles.indicator, { width: half, transform: [{ translateX }] }]}
          />
        ) : null}
        <Pressable style={styles.item} onPress={() => onChange('tables')}>
          <Text style={[styles.label, tab === 'tables' && styles.labelActive]}>Sơ đồ bàn</Text>
          <Text style={[styles.sub, tab === 'tables' && styles.subActive]}>
            {`${busyCount}/10 có khách`}
          </Text>
        </Pressable>
        <Pressable style={styles.item} onPress={() => onChange('menu')}>
          <Text style={[styles.label, tab === 'menu' && styles.labelActive]}>Thực đơn</Text>
          <Text style={[styles.sub, tab === 'menu' && styles.subActive]}>{`${dishCount} món`}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const PAD = 6;

const styles = StyleSheet.create({
  outer: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: PAD,
    ...shadow,
  },
  indicator: {
    position: 'absolute',
    top: PAD,
    bottom: PAD,
    left: PAD,
    borderRadius: 14,
    backgroundColor: colors.primary,
  },
  item: { flex: 1, alignItems: 'center', paddingVertical: 8 },
  label: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.textSub },
  labelActive: { color: colors.white },
  sub: { fontSize: fontSize.tiny, color: colors.placeholder, marginTop: 2 },
  subActive: { color: colors.tabSubActive },
});
