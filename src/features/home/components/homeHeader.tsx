import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { HomeLocation } from '../types/HomeLocation';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';
import LocationSearchInput from './locationSearchInput';

type HomeHeaderProps = {
  selectedLocation: HomeLocation | undefined;
  searchKeyword: string;
  onChangeKeyword: (value: string) => void;
};

export default function HomeHeader({
  selectedLocation,
  searchKeyword,
  onChangeKeyword,
}: HomeHeaderProps) {
  return (
    <View style={styles.headerArea}>
      <Text style={styles.headerText}>
        📍 {selectedLocation?.name ?? 'กำลังโหลดตำแหน่ง...'}
      </Text>
      <Text style={styles.addressHint}>{selectedLocation?.addressHint ?? ''}</Text>
      <LocationSearchInput value={searchKeyword} onChangeText={onChangeKeyword} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerArea: {
    backgroundColor: '#00c300',
    paddingTop: spacing.lg + spacing.xs,
    paddingHorizontal: spacing.lg + spacing.xs,
    paddingBottom: spacing.xl,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: 'white',
    ...typography.heading,
  },
  addressHint: {
    color: '#e9ffe9',
    ...typography.caption,
    marginTop: spacing.xxs,
  },
});
