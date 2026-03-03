import { StyleSheet } from 'react-native';
import { colors } from '../../../shared/theme/colors';
import { spacing } from '../../../shared/theme/spacing';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  ratingBadge: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    marginLeft: spacing.sm,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textInverse,
  },
  cuisineAndDistance: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cuisineText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  distanceText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  signatureDishesLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
  },
  dishRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xs,
  },
  dishName: {
    fontSize: 12,
    color: colors.textPrimary,
    flex: 1,
  },
  dishPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: spacing.sm,
  },
});
