import React, { useState } from 'react';
import {
  View,
  SectionList,
  StyleSheet,
  Text,
} from 'react-native';
import ExpenseItem from '../components/ExpenseItem';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import { Expense } from '../types';
import { useNavigation } from '@react-navigation/native';
import colors from '../theme/colors';

export default function HomeScreen() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState([
    { label: 'Yemek', value: 'yemek' },
    { label: 'Ulaşım', value: 'ulasim' },
    { label: 'Sağlık', value: 'saglik' },
    { label: 'Eğlence', value: 'eglence' },
    { label: 'Diğer', value: 'diger' },
  ]);

  const navigation = useNavigation<any>();

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  const addCategory = (category: { label: string; value: string }) => {
    setCategories((prev) => [...prev, category]);
  };

  const handleDeleteExpense = (expenseId: string) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  const groupedExpenses = categories
    .map((category) => ({
      title: category.label,
      data: expenses.filter((expense) => expense.categoryId === category.value),
    }))
    .filter((section) => section.data.length > 0);

  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {expenses.length === 0 ? (
          <EmptyState message="Henüz gider eklenmedi." />
        ) : (
          <SectionList
            sections={groupedExpenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ExpenseItem
                expense={item}
                onPress={() => {
                  navigation.navigate('ExpenseDetail', {
                    expenseId: item.id,
                    expenseTitle: item.title,
                    handleDeleteExpense: handleDeleteExpense,
                  });
                }}
              />
            )}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.sectionHeader}>{title}</Text>
            )}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
  
      <View style={styles.fixedButtons}>
        <Button
          title="Yeni Gider Ekle"
          onPress={() =>
            navigation.navigate('AddExpense', {
              onAdd: addExpense,
              categories: categories,
            })
          }
        />
        <Button
          color={colors.primary}
          title="Kategoriler"
          onPress={() =>
            navigation.navigate('Category', {
              onAdd: addExpense,
              categories: categories,
              addCategory: addCategory,
              expenses: expenses,
            })
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  listContainer: {
    flex: 1,
  },
  list: {
    paddingBottom: 16,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#96DED1',
    color: 'black',
    padding: 8,
    marginTop: 5,
    borderRadius: 8,
  },
  fixedButtons: {
    gap: 8,
  },
});
