import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  useRoute,
  useNavigation,
  RouteProp,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';
import Button from '../components/Button';

type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Category'>;

type Category = {
  label: string;
  value: string;
};

export default function CategoryScreen() {
  const route = useRoute<CategoryScreenRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { categories, addCategory, expenses } = route.params;
  const [customCategory, setCustomCategory] = useState('');
  const [categoryList, setCategoryList] = useState<Category[]>(categories);

  useEffect(() => {
    setCategoryList(categories);
  }, [categories]);

  const handleAddCustomCategory = () => {
    if (!customCategory.trim()) {
      Alert.alert('Kategori Adı Boş Bırakılamaz', 'Lütfen kategori adı girin');
      return;
    }

    const newCategory = {
      label: customCategory.trim(),
      value: customCategory.trim().toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '_'),
    };

    setCategoryList((prevCategories) => [...prevCategories, newCategory]);
    addCategory(newCategory);
    setCustomCategory('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Kategoriler</Text>

      <FlatList
        data={categoryList}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.categoryItem}
              onPress={() =>
                navigation.navigate('DetailsCategoryScreen', {
                  category: item,
                  expenses: expenses.filter((expense) => expense.categoryId === item.value),
                })
              }
            >
              <Text style={styles.categoryTitle}>{item.label}</Text>
            </TouchableOpacity>
          );
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Yeni kategori adı"
        value={customCategory}
        onChangeText={setCustomCategory}
        keyboardType="default"
      />

      <View style={styles.buttonContainer}>
        <Button title="Kategori Ekle" onPress={handleAddCustomCategory} />
        <View style={styles.buttonSpacing} />
        <Button title="Ana Sayfaya Dön" onPress={() => navigation.goBack()} />
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
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  categoryItem: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  categoryTitle: {
    fontSize: 18,
    color: colors.white,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: "white",
    padding: 10,
    marginVertical: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 12,
  },
  buttonSpacing: {
    height: 10,
  },
});
