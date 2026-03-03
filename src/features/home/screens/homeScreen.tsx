import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AppLayout from '../../../shared/layouts/AppLayout';
import useHomeNavigation from '../hooks/useHomeNavigation';
import BottomNav from '../components/bottomNav';
import HomeMenuGrid from '../components/homeMenuGrid';
import HomeHeader from '../components/homeHeader';
import NearbyLocationList from '../components/nearbyMapCard';
import useDebouncedKeyword from '../hooks/useDebouncedKeyword';
import useHomeLocationQuery from '../hooks/useHomeLocationQuery';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { onMenuPress, onFooterPress } = useHomeNavigation(navigation);

  const { keyword, setKeyword } = useDebouncedKeyword(400);
  const { data: locations = [], isLoading } = useHomeLocationQuery(keyword);

  const headerAddress = useMemo(() => {
    return locations[0]?.addressHint ?? '';
  }, [locations]);

  return (
    <AppLayout style={styles.container}>
      <ScrollView>
        <HomeHeader
          selectedLocation={locations[0]}
          selectedAddress={headerAddress}
          searchKeyword={keyword}
          onChangeKeyword={setKeyword}
        />

        {isLoading && (
          <View style={styles.loadingArea}>
            <Text style={styles.loadingText}>กำลังอัปเดตพื้นที่ให้บริการ...</Text>
          </View>
        )}

        <NearbyLocationList locations={locations} />

        <HomeMenuGrid onPressItem={onMenuPress} />
      </ScrollView>

      <BottomNav onPressItem={onFooterPress} />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingArea: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
    fontSize: 14,
  },
});