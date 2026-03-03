/**
 * OrderSummaryCard Component
 * Displays order pricing breakdown: subtotal, discount, delivery fee, total.
 * Memoized for performance, receives minimal props.
 */

import React from 'react';
import { View, Text } from 'react-native';
import type { OrderSummary } from '../types';
import { styles } from './OrderSummaryCard.styles';

export interface OrderSummaryCardProps {
  orderSummary: OrderSummary;
  isEmpty?: boolean;
}

/**
 * Renders pricing breakdown with subtotal, discount (if any), delivery fee, and total.
 * Does not contain any business logic or calculations.
 */
const OrderSummaryCardComponent = ({
  orderSummary,
  isEmpty = false,
}: OrderSummaryCardProps) => {
  if (isEmpty) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>Cart is empty</Text>
      </View>
    );
  }

  const hasDiscount = orderSummary.discount > 0;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Order Summary</Text>

      <View style={styles.rowContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>฿{orderSummary.subtotalFood.toFixed(2)}</Text>
        </View>

        {hasDiscount && (
          <View style={styles.row}>
            <Text style={styles.label}>Discount (5%)</Text>
            <Text style={styles.discountValue}>
              -฿{orderSummary.discount.toFixed(2)}
            </Text>
          </View>
        )}

        <View style={styles.row}>
          <Text style={styles.label}>Delivery Fee</Text>
          <Text style={styles.value}>฿{orderSummary.deliveryFee.toFixed(2)}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>฿{orderSummary.total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

/**
 * Memoized export to prevent unnecessary re-renders.
 */
export const OrderSummaryCard = React.memo(
  OrderSummaryCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.orderSummary.total === nextProps.orderSummary.total &&
      prevProps.orderSummary.discount === nextProps.orderSummary.discount &&
      prevProps.isEmpty === nextProps.isEmpty
    );
  }
);

OrderSummaryCard.displayName = 'OrderSummaryCard';
