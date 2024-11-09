import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const CategoryCard = ({ category }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: category.imageUrl }} style={styles.thumbnail} />
      <Text style={styles.name}>{category.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  thumbnail: {
    width: '100%',
    height: 200,
  },
  name: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryCard;
