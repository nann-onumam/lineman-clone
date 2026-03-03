import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AppLayout from '../../../shared/layouts/AppLayout';
import useHomeNavigation from '../hooks/useHomeNavigation';
import BottomNav from '../components/bottomNav';
import HomeMenuGrid from '../components/homeMenuGrid';
import HomeHeader from '../components/homeHeader';
import useHomeLocationQuery from '../hooks/useHomeLocationQuery';

type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { onMenuPress, onFooterPress } = useHomeNavigation(navigation);

  const { data: locations = [] } = useHomeLocationQuery('');

  return (
    <AppLayout style={styles.container}>
      <ScrollView>
        <HomeHeader selectedLocation={locations[0]} />

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
});