import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MENU_DATA } from '../../../shared/constants/MenuData';

type HomeMenuGridProps = {
  onPressItem: (itemId: number, title: string) => void;
};

export default function HomeMenuGrid({ onPressItem }: HomeMenuGridProps) {
  return (
    <View style={styles.gridMenu}>
      {MENU_DATA.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.menuBox}
          onPress={() => onPressItem(item.id, item.title)}
        >
          <Text>{item.icon} {item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  gridMenu: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: -80, paddingHorizontal: 10 },
  menuBox: { width: '45%', height: 90, backgroundColor: 'white', margin: 5, borderRadius: 10, justifyContent: 'center', alignItems: 'center', elevation: 2 },
});
