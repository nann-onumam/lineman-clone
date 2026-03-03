import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { HomeLocation } from '../types/HomeLocation';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

type NearbyLocationListProps = {
  locations: HomeLocation[];
};

export default function NearbyLocationList({ locations }: NearbyLocationListProps) {
  const renderLocationItem = ({ item }: { item: HomeLocation }) => (
    <View style={styles.locationItem}>
      <Text style={styles.locationName}>{item.name}</Text>
      <Text style={styles.locationAddress}>{item.addressHint}</Text>
    </View>
  );

  return (
    <View style={styles.card}>
      <Text style={styles.title}>พื้นที่ให้บริการ</Text>
      {locations.length === 0 ? (
        <Text style={styles.emptyText}>ไม่พบพื้นที่ใกล้เคียง</Text>
      ) : (
        <FlatList
          data={locations}
          renderItem={renderLocationItem}
          keyExtractor={item => item.id}
          scrollEnabled={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    elevation: 2,
  },
  title: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: spacing.sm,
    color: '#00c300',
  },
  locationItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  locationName: {
    ...typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  locationAddress: {
    ...typography.body,
    fontSize: 12,
    color: '#666',
  },
  emptyText: {
    ...typography.body,
    color: '#999',
    fontStyle: 'italic',
  },
});