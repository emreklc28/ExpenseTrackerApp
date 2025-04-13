import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import colors from '../theme/colors';

type DetailsCategoryScreenRouteProp = RouteProp<RootStackParamList, 'DetailsCategoryScreen'>;

export default function DetailsCategoryScreen() {
  const route = useRoute<DetailsCategoryScreenRouteProp>();
  const { category, expenses } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.label} Kategorisi</Text>

      {expenses.length === 0 ? (
        <Text style={styles.emptyText}>Kategori boş</Text>
      ) : (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.title}</Text>
              <Text style={styles.itemAmount}>{item.amount} ₺</Text>
            </View>
          )}
        />
      )}
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemContainer: {
    padding: 12,
    backgroundColor: "#96DED1"	,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 30,
    color: "black",
  },
  itemAmount: {
    fontSize: 30,
    fontFamily:"bold",
    color: "red",
    marginTop: 4,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginTop: 40,
  },
});
