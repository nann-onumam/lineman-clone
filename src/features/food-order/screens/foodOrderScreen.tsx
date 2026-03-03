import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function FoodOrderScreen({ navigation }: any) {
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>หน้าสั่งอาหาร 🍔</Text>
      <Text style={styles.subtitle}>ตอนนี้คุณอยู่ใน Feature: food-order แล้วครับ</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleBackPress}
      >
        <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00c300', // สีเขียว LINE MAN
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#00c300',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});