import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import colors from '../theme/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function ExpenseDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { expenseId, handleDeleteExpense, expenseTitle } = route.params;

  const handleDelete = () => {
    handleDeleteExpense(expenseId);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gider Detayları</Text>
      <Text style={styles.text}>Giderinizin Açıklaması: {expenseTitle}</Text>

      <Button title="Sil" onPress={handleDelete} color={colors.danger} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  text:{
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,

  }
});
