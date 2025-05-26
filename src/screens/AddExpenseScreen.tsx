import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import Button from '../components/Button';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Expense } from '../types';

type AddExpenseScreenRouteProp = RouteProp<RootStackParamList, 'AddExpense'>;
type AddExpenseScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AddExpense'>;

export default function AddExpenseScreen() {
  const route = useRoute<AddExpenseScreenRouteProp>();
  const navigation = useNavigation<AddExpenseScreenNavigationProp>();
  const { onAdd, categories } = route.params;

  const [title, setTitle] = useState(''); 
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSaveExpense = () => {
    if (!title || !amount || !category) {
      Alert.alert('Eksik Bilgiler', 'Lütfen tüm alanları doldurun!');
      return;
    }

    // Miktar geçerli bir sayı mı kontrolü
    if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
      Alert.alert('Geçersiz Miktar', 'Miktar sadece sayı olabilir');
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      categoryId: category,
    };

    onAdd(newExpense);
    navigation.popToTop();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.input}>
        <Picker
          selectedValue={category}
          onValueChange={(value) => setCategory(value)}
          style={styles.picker}
        >
          <Picker.Item label="Kategori Seçin" value="" />
          {categories.map((category) => (
            <Picker.Item key={category.value} label={category.label} value={category.value} />
          ))}
        </Picker>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Miktar"
        value={amount}
        onChangeText={setAmount}  // Miktar değerini güncelleme
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Gider Başlığı"
        value={title}
        onChangeText={setTitle}
      />

      <Button title="Kaydet" onPress={handleSaveExpense} color='green'/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  input: {
    borderWidth: 3,
    borderRadius:5,
    borderColor: 'blue',
    backgroundColor:"white",
    padding: 8,
    marginBottom: 10,
  },
  picker: {
    height: 80,
    width: '100%',
  },
});
