// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// 1. Import หน้า FoodOrderScreen เข้ามา (ต้องสร้างไฟล์นี้ไว้ใน features ด้วยนะ)
import HomeScreen from './src/features/home/screens/homeScreen';
import FoodOrderScreen from './src/features/food-order/screens/foodOrderScreen'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* หน้าแรก */}
        <Stack.Screen name="Home" component={HomeScreen} />
        
        {/* 2. เพิ่มหน้า FoodOrder ลงในสารบัญ เพื่อให้ระบบหาเจอเวลาเราสั่ง navigate */}
        <Stack.Screen 
          name="FoodOrder" 
          component={FoodOrderScreen} 
          options={{ headerShown: true, title: 'สั่งอาหาร' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}