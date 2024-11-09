import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('nba_highlights.db');

// Create tables if they don't exist
export const setupDatabase = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        imageUrl TEXT
      )`
    );
  });
};

// Insert some sample data into the categories table
export const insertCategory = (name, description, imageUrl) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO categories (name, description, imageUrl) VALUES (?, ?, ?)',
      [name, description, imageUrl]
    );
  });
};

// Fetch categories from the database
export const getCategories = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM categories',
      [],
      (_, { rows }) => {
        callback(rows._array); // Callback with the result
      },
      (_, error) => {
        console.error(error);
      }
    );
  });
};
