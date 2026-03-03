import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { spacing } from '../../../shared/theme/spacing';
import { typography } from '../../../shared/theme/typography';

type LocationSearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function LocationSearchInput({
  value,
  onChangeText,
}: LocationSearchInputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>ค้นหาตำแหน่งจัดส่ง</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="พิมพ์ชื่อพื้นที่ เช่น สุขุมวิท"
        placeholderTextColor="#6b7280"
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: spacing.md,
  },
  label: {
    color: 'white',
    ...typography.caption,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    ...typography.body,
  },
});
