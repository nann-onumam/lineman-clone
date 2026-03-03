// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AppLayout from '../../../shared/layouts/AppLayout';
import useHomeNavigation from '../hooks/useHomeNavigation';
import HomeMenuGrid from '../components/homeMenuGrid';
import BottomNav from '../components/bottomNav';

export default function HomeScreen({ navigation }: any) {
  const { onMenuPress, onFooterPress } = useHomeNavigation(navigation);

  return (
    <AppLayout style={styles.container}>
      <ScrollView>
        <View style={styles.headerArea}>
          <Text style={styles.headerText}>📍 รีเจ้นท์ พัฒนาการ...</Text>
        </View>

        <HomeMenuGrid onPressItem={onMenuPress} />
      </ScrollView>

      <BottomNav onPressItem={onFooterPress} />
    </AppLayout>
  );
}

// ย้าย styles มาไว้ท้ายไฟล์นี้ด้วยครับ
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerArea: { backgroundColor: '#00c300', height: 180, paddingTop: 20, paddingHorizontal: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});