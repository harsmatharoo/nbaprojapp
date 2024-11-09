import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet, Text, ActivityIndicator } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// Open SQLite database (You can create your own SQLite database file and path)
const db = SQLite.openDatabase({ name: 'categories.db', location: 'default' });

const LandingPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Fetch categories from the SQLite database when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Open database and execute SQL query to fetch data
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM categories',
            [],
            (tx, results) => {
              let fetchedCategories = [];
              for (let i = 0; i < results.rows.length; i++) {
                fetchedCategories.push(results.rows.item(i));
              }
              setCategories(fetchedCategories);
              setLoading(false);
            },
            (error) => {
              setError('Failed to fetch categories.');
              setLoading(false);
            }
          );
        });
      } catch (err) {
        setError('Failed to fetch categories.');
        setLoading(false);
      }
    };

    fetchCategories(); // Call the function to fetch categories
  }, []);

  // Show loading indicator while fetching data
  if (loading) return <ActivityIndicator style={styles.centered} size="large" />;

  // Show error message if any error occurs during fetching
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  // If a category is selected, show category details
  if (selectedCategory) {
    return (
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>You selected: {selectedCategory.name}</Text>
        <Text style={styles.detailsText}>Description: {selectedCategory.description}</Text>
        <TouchableOpacity onPress={() => setSelectedCategory(null)}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedCategory(item)}>
            <CategoryCard category={item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Category Card Component to display each category
const CategoryCard = ({ category }) => (
  <View style={styles.card}>
    <Text style={styles.categoryName}>{category.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  card: { padding: 20, marginBottom: 10, backgroundColor: '#f0f0f0', borderRadius: 5 },
  categoryName: { fontSize: 18 },
  detailsContainer: { alignItems: 'center', padding: 20 },
  detailsText: { fontSize: 22, fontWeight: 'bold' },
  goBackText: { color: 'blue', fontSize: 18, marginTop: 20 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
});

export default LandingPage;
