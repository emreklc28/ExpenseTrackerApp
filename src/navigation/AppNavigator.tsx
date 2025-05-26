import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import CategoryScreen from '../screens/CategoryScreen';
import ExpenseDetailScreen from '../screens/ExpenseDetailScreen';
import DetailsCategoryScreen from '../screens/DetailsCategoryScreen';
import { Expense } from '../types';

export type RootStackParamList = {
  Home: {
    categories: { label: string; value: string }[];
    expenses: Expense[];
    addExpense: (expense: Expense) => void;
  };
  AddExpense: {
    onAdd: (expense: Expense) => void;
    categories: { label: string; value: string }[];
  };
  Category: {
    onAdd: (expense: Expense) => void;
    categories: { label: string; value: string }[];
    addCategory: (category: { label: string; value: string }) => void;
    expenses: Expense[];
  };
  ExpenseDetail: {
    
    
  };
  DetailsCategoryScreen: {
    category: { label: string; value: string };
    expenses: Expense[];
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [categories, setCategories] = useState<{ label: string; value: string }[]>([
    { label: 'Yemek', value: 'yemek' },
    { label: 'Ulaşım', value: 'ulasim' },
    { label: 'Sağlık', value: 'saglik' },
    { label: 'Eğlence', value: 'eglence' },
    { label: 'Diğer', value: 'diger' },
  ]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const addCategory = (category: { label: string; value: string }) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const addExpense = (expense: Expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Ana Sayfa' }}
        initialParams={{
          categories: categories,
          expenses: expenses,
          addExpense: addExpense,
        }}
      />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ title: 'Gider Ekle' }}
        initialParams={{
          onAdd: addExpense,
          categories: categories,
        }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ title: 'Kategoriler' }}
        initialParams={{
          onAdd: addExpense,
          categories: categories,
          addCategory: addCategory,
          expenses: expenses,
        }}
      />
      <Stack.Screen
        name="ExpenseDetail"
        component={ExpenseDetailScreen}
        options={{ title: 'Gider Detayı' }}
      />
      <Stack.Screen
        name="DetailsCategoryScreen"
        component={DetailsCategoryScreen}
        options={{ title: 'Kategori Detayı' }}
      />
    </Stack.Navigator>
  );
}
