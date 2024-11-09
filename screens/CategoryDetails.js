import React, { useEffect, useState } from 'react'; // Importing React and hooks for state and effect management
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'; // Importing React Native components for UI
import { useRoute } from '@react-navigation/native'; // Importing useRoute to access route params for categoryId
import { getCategoryById } from '../services/database'; // Importing the function to fetch category details from the database

const CategoryDetails = () => {
  // State hooks to manage category data, loading state, and any errors
  const [category, setCategory] = useState(null); // Holds the selected category object
  const [loading, setLoading] = useState(true); // Manages loading state for fetching data
  const [error, setError] = useState(null); // Holds any errors encountered during fetch

  // Accessing the categoryId from route params (passed from previous screen/navigation)
  const route = useRoute();
  const { categoryId } = route.params;

  // useEffect hook to fetch category details when the component mounts or when categoryId changes
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true); // Set loading to true when starting the fetch
        const selectedCategory = await getCategoryById(categoryId); // Fetch category data by ID from the database

        if (selectedCategory) {
          setCategory(selectedCategory); // Set category data if found
        } else {
          setError('Category not found'); // Set error if category is not found
        }
      } catch (err) {
        setError('Failed to fetch category details'); // Set error in case of fetch failure
      } finally {
        setLoading(false); // Set loading to false once the fetch operation is completed
      }
    };

    fetchCategory(); 
  }, [categoryId]); 

  if (loading) {
    return <ActivityIndicator style={styles.centered} size="large" />; // Display a loading spinner
  }


  if (error) {
    return <Text style={styles.errorText}>{error}</Text>; // Show error message
  }

  // If no category is found (null), display a message indicating that
  if (!category) {
    return <Text>No category exists!</Text>; // Show a message if category is not found
  }

  // Render the category details: Image, name, and description
  return (
    <View style={styles.container}>
      <Image
        source={category.imageUrl} // Load the image for the category (local image reference)
        style={styles.image}
      />
      <Text style={styles.name}>{category.name}</Text> // Display the category name
      <Text style={styles.description}>{category.description}</Text> // Display the category description
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryDetails; // Exporting the component so it can be used in other parts of the app
