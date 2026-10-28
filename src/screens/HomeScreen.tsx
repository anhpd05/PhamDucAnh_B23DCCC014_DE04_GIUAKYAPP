import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import HomeTabBar from '../components/HomeTabBar';
import ScreenContainer from '../components/ScreenContainer';
import type { HomeTab, RootStackParamList } from '../navigation/types';
import { busyTables } from '../store/selectors';
import { useApp } from '../store/AppContext';
import MenuTab from './home/MenuTab';
import TablesTab from './home/TablesTab';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ route }: Props) {
  const { state } = useApp();
  const [tab, setTab] = useState<HomeTab>('tables');
  const paramTab = route.params?.tab;

  useEffect(() => {
    if (paramTab) {
      setTab(paramTab);
    }
  }, [paramTab]);

  const busyCount = useMemo(() => busyTables(state.invoices).size, [state.invoices]);

  return (
    <ScreenContainer>
      <View style={styles.body}>
        {tab === 'tables' ? <TablesTab /> : <MenuTab onGoTables={() => setTab('tables')} />}
      </View>
      <HomeTabBar tab={tab} onChange={setTab} busyCount={busyCount} dishCount={state.dishes.length} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({ body: { flex: 1 } });
