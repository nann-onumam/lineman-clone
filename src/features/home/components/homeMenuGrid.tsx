import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MENU_DATA } from '../../../shared/constants/MenuData';
import { spacing } from '../../../shared/theme/spacing';

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
  gridMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: -80,
    paddingHorizontal: spacing.md - spacing.xxs,
  },
  menuBox: {
    width: '45%',
    height: 90,
    backgroundColor: 'white',
    margin: (spacing.md - spacing.xxs) / 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
});