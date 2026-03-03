// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AppLayout from '../../../shared/layouts/AppLayout';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
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
  headerArea: {
    backgroundColor: '#00c300',
    height: 180,
    paddingTop: spacing.lg + spacing.xs,
    paddingHorizontal: spacing.lg + spacing.xs,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: 'white',
    ...typography.heading,
  },
});
