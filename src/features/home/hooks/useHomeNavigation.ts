import { Alert } from 'react-native';

type Navigation = {
  navigate: (screen: string) => void;
};

export default function useHomeNavigation(navigation: Navigation) {
  const onMenuPress = (itemId: number, title: string) => {
    if (itemId === 1) {
      navigation.navigate('FoodOrder');
      return;
    }

    Alert.alert(title);
  };

  const onFooterPress = (title: string) => {
    Alert.alert(title);
  };

  return {
    onMenuPress,
    onFooterPress,
  };
}
