/**
 * Food Order Navigation Hook
 * Centralized navigation logic for food ordering feature.
 * Decouples navigation details from UI components.
 */

import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../../../core/navigation';
import type { FoodOrderNavigationCallbacks } from '../types';

type Navigation = {
  canGoBack: () => boolean;
  goBack: () => void;
  navigate: <T extends keyof RootStackParamList>(screen: T) => void;
};

/**
 * Provides navigation callbacks for food order screens and components.
 * This hook encapsulates navigation logic, keeping components pure and testable.
 */
export default function useFoodOrderNavigation(): FoodOrderNavigationCallbacks {
  const navigation = useNavigation<Navigation>();

  const onBackPress = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    // Navigate to home as fallback if no history
    navigation.navigate('Home');
  };

  return {
    onBackPress,
  };
}
