// src/features/home/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { MENU_DATA, FOOTER_DATA } from '../../../shared/constants/MenuData';
import AppLayout from '../../../shared/layouts/AppLayout';
import useHomeNavigation from '../hooks/useHomeNavigation';

export default function HomeScreen({ navigation }: any) {
  const { onMenuPress, onFooterPress } = useHomeNavigation(navigation);

  return (
    <AppLayout style={styles.container}>
      <ScrollView>
        <View style={styles.headerArea}>
          <Text style={styles.headerText}>📍 รีเจ้นท์ พัฒนาการ...</Text>
        </View>

        <View style={styles.gridMenu}>
          {MENU_DATA.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuBox}
              onPress={() => onMenuPress(item.id, item.title)}
            >
              <Text>{item.icon} {item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {FOOTER_DATA.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => onFooterPress(item.title)}>
            <Text>{item.icon} {item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </AppLayout>
  );
}

// ย้าย styles มาไว้ท้ายไฟล์นี้ด้วยครับ
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerArea: { backgroundColor: '#00c300', height: 180, paddingTop: 20, paddingHorizontal: 20, borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  gridMenu: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: -80, paddingHorizontal: 10 },
  menuBox: { width: '45%', height: 90, backgroundColor: 'white', margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  bottomNav: { flexDirection: 'row', height: 70, backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#e0e0e0' },
});