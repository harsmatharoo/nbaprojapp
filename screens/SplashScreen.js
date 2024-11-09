import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook from React Navigation
import * as Animatable from 'react-native-animatable'; // Import Animatable for animations

const SplashScreen = () => {
  const navigation = useNavigation(); // Hook to access navigation functions

  // useEffect hook to perform side-effects, like navigation, after component mounts
  useEffect(() => {
    // Set a timer to navigate to LandingPage after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('LandingPage'); // Replace the current screen with 'LandingPage'
    }, 3000); // Wait for 3 seconds (3000 milliseconds)

    // Cleanup function to clear the timeout if the component unmounts early
    return () => clearTimeout(timer);
  }, [navigation]); // Dependency array, rerun effect if navigation object changes

  return (
    <View style={styles.container}>
      {/* Animatable component used to animate the logo */}
      <Animatable.View animation="fadeIn" duration={1500}>
        <Image 
          source={require('../assets/images/logo.png')} 
          style={styles.logo} 
        />
      </Animatable.View>
    </View>
  );
};

// StyleSheet for the layout and appearance of the SplashScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Make the container take up the full screen
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#000', 
  },
  logo: {
    width: 200, // Width of the logo image
    height: 200, // Height of the logo image
  },
});

export default SplashScreen; // Export the SplashScreen component for use in navigation

