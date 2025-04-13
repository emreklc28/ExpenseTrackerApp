import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Expense } from '../types';
import { formatDate } from '../utils/formatDate';
import colors from '../theme/colors';

type ExpenseItemProps = {
  expense: Expense;
  onPress: () => void;
};

export default function ExpenseItem({ expense, onPress }: ExpenseItemProps) {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.title}>{expense.title}</Text>
        <Text style={styles.amount}>₺{expense.amount}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.date}>{formatDate(expense.date)}</Text>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: "colors.text",
  },
  amount: {
    fontSize: 25,
    color: "red",
  },
  date: {
    fontSize: 18,
    color: "grey",
  },
  category: {
    fontSize: 12,
    color: colors.secondary,
  },
});

