import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeScreen } from './src/features/home';
import FoodOrderScreen from './src/features/food-order/screens/foodOrderScreen';

const Stack = createStackNavigator();
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
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}