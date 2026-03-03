import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FOOTER_DATA } from '../data/menuData';
import { typography } from '../../../shared/theme/typography';

type BottomNavProps = {
  onPressItem: (title: string) => void;
};

export default function BottomNav({ onPressItem }: BottomNavProps) {
  return (
    <View style={styles.bottomNav}>
      {FOOTER_DATA.map((item: { id: number; title: string; icon: string }) => (
        <TouchableOpacity key={item.id} onPress={() => onPressItem(item.title)}>
          <Text style={styles.footerText}>{item.icon} {item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: { flexDirection: 'row', height: 70, backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', borderTopWidth: 1, borderColor: '#e0e0e0' },
  footerText: {
    ...typography.caption,
  },
});