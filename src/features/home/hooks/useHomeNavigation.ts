import { Alert } from 'react-native';
import type { RootNavigationRoute } from '../../../core/navigation';
import { getRouteFromMenuId } from '../../../core/navigation';

type Navigation = {
  navigate: <T extends RootNavigationRoute>(screen: T) => void;
};

export default function useHomeNavigation(navigation: Navigation) {
  const onMenuPress = (itemId: number, title: string) => {
    const route = getRouteFromMenuId(itemId);
    
    if (route) {
      navigation.navigate(route);
      return;
    }

    // Fallback for un-routed menu items
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
