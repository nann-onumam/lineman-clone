import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MENU_DATA } from '../data/menuData';
import type { MenuItem } from '../types/MenuItem';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

type HomeMenuGridProps = {
  onPressItem: (itemId: number, title: string) => void;
};

export default function HomeMenuGrid({ onPressItem }: HomeMenuGridProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>บริการทั้งหมด</Text>
      <View style={styles.gridMenu}>
        {MENU_DATA.map((item: MenuItem) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuBox}
            onPress={() => onPressItem(item.id, item.title)}
          >
            <Text style={styles.menuText}>
              {item.icon} {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    elevation: 2,
  },
  sectionTitle: {
    ...typography.body,
    fontWeight: '600',
    marginHorizontal: spacing.sm,
    marginBottom: spacing.xs,
  },
  gridMenu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  menuBox: {
    width: '45%',
    height: 90,
    backgroundColor: '#f9fafb',
    margin: (spacing.md - spacing.xxs) / 2,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    ...typography.body,
  },
});