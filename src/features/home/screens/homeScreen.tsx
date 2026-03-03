import React from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Text } from 'react-native';
import AppLayout from '../../../shared/layouts/AppLayout';
import useHomeNavigation from '../hooks/useHomeNavigation';
import BottomNav from '../components/bottomNav';
import HomeMenuGrid from '../components/homeMenuGrid';
import HomeHeader from '../components/homeHeader';
import NearbyMapCard from '../components/nearbyMapCard';
import useDebouncedKeyword from '../hooks/useDebouncedKeyword';
import useHomeLocationQuery from '../hooks/useHomeLocationQuery';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { onMenuPress, onFooterPress } = useHomeNavigation(navigation);

  const { keyword, setKeyword, debouncedKeyword } = useDebouncedKeyword(400);
  const { data: locations = [], isLoading, isFetching } = useHomeLocationQuery(debouncedKeyword);

  return (
    <AppLayout style={styles.container}>
      <ScrollView>
        <HomeHeader
          selectedLocation={locations[0]}
          searchKeyword={keyword}
          onChangeKeyword={setKeyword}
        />

        {(isLoading || isFetching) && (
          <View style={styles.loadingArea}>
            <ActivityIndicator color="#00c300" />
            <Text style={styles.loadingText}>กำลังอัปเดตพื้นที่ให้บริการ...</Text>
          </View>
        )}

        <NearbyMapCard locations={locations} />
        <HomeMenuGrid onPressItem={onMenuPress} />
      </ScrollView>

      <BottomNav onPressItem={onFooterPress} />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  loadingArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  loadingText: {
    marginLeft: 8,
    color: '#4b5563',
  },
});