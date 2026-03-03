/**
 * Food Order Screen Styles
 * Extracted styling for FoodOrderScreen component.
 */

import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background || '#fff',
  },
  title: {
    ...typography.heading,
    color: colors.primary || '#00c300',
    marginBottom: spacing.md,
  },
  subtitle: {
    ...typography.body,
    color: colors.secondary || '#666',
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary || '#00c300',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 25,
  },
  buttonText: {
    color: colors.background || '#fff',
    ...typography.body,
    fontWeight: 'bold',
  },
});
