import { Alert } from 'react-native';
import useHomeNavigation from '../useHomeNavigation';

jest.mock('react-native', () => ({
  Alert: {
    alert: jest.fn(),
  },
}));

describe('useHomeNavigation', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('navigates to FoodOrder when menu id is 1', () => {
    const { onMenuPress } = useHomeNavigation({ navigate: mockNavigate });

    onMenuPress(1, 'สั่งอาหาร');

    expect(mockNavigate).toHaveBeenCalledWith('FoodOrder');
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('shows alert with title when menu id is not 1', () => {
    const { onMenuPress } = useHomeNavigation({ navigate: mockNavigate });

    onMenuPress(2, 'มาร์ท');

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(Alert.alert).toHaveBeenCalledWith('มาร์ท');
  });

  it('shows alert with footer title on footer press', () => {
    const { onFooterPress } = useHomeNavigation({ navigate: mockNavigate });

    onFooterPress('บัญชี');

    expect(Alert.alert).toHaveBeenCalledWith('บัญชี');
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
