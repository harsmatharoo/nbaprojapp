import * as SQLite from 'expo-sqlite';

// Open the SQLite database (or create it if it doesn't exist)
const db = SQLite.openDatabase('nbaHighlights.db');

// Function to initialize the database and create the necessary tables
export const initializeDB = () => {
    db.transaction(tx => {
        // Create 'categories' table if it doesn't exist
        tx.executeSql(
            'create table if not exists categories (id integer primary key not null, name text);'
        );

        // Create 'highlights' table if it doesn't exist
        // This table has a foreign key (category_id) referencing the 'categories' table
        tx.executeSql(
            'create table if not exists highlights (id integer primary key not null, category_id integer, content text, image text, audio_url text, foreign key (category_id) references categories (id));'
        );
    });
};

// Function to insert a new category into the 'categories' table
export const insertCategory = (name) => {
    db.transaction(tx => {
        // Insert the category with the given name
        tx.executeSql('insert into categories (name) values (?)', [name]);
    });
};

// Function to fetch all categories from the 'categories' table
export const getCategories = (setCategories) => {
    db.transaction(tx => {
        // Query all categories
        tx.executeSql('select * from categories', [], (_, { rows }) =>
            setCategories(rows._array) // Update state with fetched categories
        );
    });
};

// Function to fetch highlights by category from the 'highlights' table
export const getHighlightsByCategory = (categoryId, setHighlights) => {
    db.transaction(tx => {
        // Query highlights by the category_id
        tx.executeSql('select * from highlights where category_id = ?', [categoryId], (_, { rows }) =>
            setHighlights(rows._array) // Update state with fetched highlights
        );
    });
};
