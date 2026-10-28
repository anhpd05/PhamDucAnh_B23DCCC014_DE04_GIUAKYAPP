import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { RootStackParamList } from './src/navigation/types';
import DishFormScreen from './src/screens/DishFormScreen';
import MenuScreen from './src/screens/MenuScreen';
import OrderScreen from './src/screens/OrderScreen';
import { AppProvider } from './src/store/AppContext';
import PaymentScreen from './src/screens/PaymentScreen';
import TableMapScreen from './src/screens/TableMapScreen';
import { colors } from './src/theme/colors';
import { fontWeight } from './src/theme/typography';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerStyle: { backgroundColor: colors.primary },
            headerTintColor: colors.onPrimary,
            headerTitleStyle: { fontWeight: fontWeight.bold },
          }}>
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: 'Thực đơn' }}
          />
          <Stack.Screen
            name="DishForm"
            component={DishFormScreen}
            options={({ route }) => ({
              title: route.params?.dishId ? 'Sửa món' : 'Thêm món',
            })}
          />
          <Stack.Screen
            name="TableMap"
            component={TableMapScreen}
            options={{ title: 'Sơ đồ bàn' }}
          />
          <Stack.Screen
            name="Order"
            component={OrderScreen}
            options={({ route }) => ({ title: `Bàn ${route.params.tableNumber}` })}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{ title: 'Thanh toán' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

export default App;
