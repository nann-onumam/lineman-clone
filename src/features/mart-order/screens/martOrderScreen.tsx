/**
 * Mart Order Screen (Placeholder)
 * This feature is not yet implemented.
 * Reserved for future development.
 */

import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './martOrderScreen.styles';

export interface MartOrderScreenProps {
  // Navigation params from RootStackParamList
  // Currently: undefined
}

export default function MartOrderScreen(): React.ReactElement {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>สั่งของ (Mart Order) - Coming Soon</Text>
    </View>
  );
}