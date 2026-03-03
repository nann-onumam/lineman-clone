import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import type { HomeLocation } from '../types/HomeLocation';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

type NearbyMapCardProps = {
  locations: HomeLocation[];
};

const DEFAULT_REGION: Region = {
  latitude: 13.736717,
  longitude: 100.523186,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export default function NearbyMapCard({ locations }: NearbyMapCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>พื้นที่ใกล้เคียง</Text>
      <MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={DEFAULT_REGION}>
        {locations.map(location => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.name}
            description={location.addressHint}
          />
        ))}
      </MapView>
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
  },
  map: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
});
