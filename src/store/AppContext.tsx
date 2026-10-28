import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { loadData, saveDishes, saveInvoices } from '../storage/storage';
import { colors } from '../theme/colors';
import { Action, initialState, reducer, State } from './reducer';

type AppContextValue = { state: State; dispatch: React.Dispatch<Action> };

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let cancelled = false;
    loadData().then(data => {
      if (!cancelled) {
        dispatch({ type: 'HYDRATE', ...data });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      saveDishes(state.dishes);
    }
  }, [state.dishes, state.hydrated]);

  useEffect(() => {
    if (state.hydrated) {
      saveInvoices(state.invoices);
    }
  }, [state.invoices, state.hydrated]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  if (!state.hydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});
