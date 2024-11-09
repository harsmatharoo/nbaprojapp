// App.js or your relevant screen component
import React, { useEffect } from 'react';
import { Button } from 'react-native';
import { insertCategory, initializeDB } from './services/database';

const App = () => {
  useEffect(() => {
    // Initialize the database and create tables
    initializeDB();

   
    insertCategory(
      'Best 3 pointers', 
      'Your favorite highlights package', 
      require('./assets/images/3pt.png') // Local image reference
    );
    insertCategory(
      'Top Assists of the week', 
      'From the very best', 
      require('./assets/images/topassis.png') // Local image reference
    );
    insertCategory(
      'Worst fouls of the week', 
      'Fouls that impacted the play', 
      require('./assets/images/worstf.png') // Local image reference
    );
  }, []);

  return (
    <Button
      title="Add Categories"
      onPress={() => {
        insertCategory(
          'Books', 
          'Books from various genres', 
          require('./assets/images/worst-fouls.jpg') // Local image reference
        );
      }}
    />
  );
};

export default App;
