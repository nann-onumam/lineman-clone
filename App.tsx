import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RootStackParamList } from './src/core/navigation';
import { HomeScreen } from './src/features/home';
import { FoodOrderScreen } from './src/features/food-order';
import { FoodOrderSearchScreen } from './src/features/food-order/screens';
import MartOrderScreen from './src/features/mart-order/screens/martOrderScreen';

const Stack = createStackNavigator<RootStackParamList>();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="FoodOrder"
            component={FoodOrderScreen}
            options={{ headerShown: true, title: 'สั่งอาหาร' }}
          />
          <Stack.Screen
            name="FoodOrderSearch"
            component={FoodOrderSearchScreen}
            options={{ headerShown: true, title: 'ค้นหาร้านอาหาร' }}
          />
          <Stack.Screen
            name="MartOrder"
            component={MartOrderScreen}
            options={{ headerShown: true, title: 'สั่งของ' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}