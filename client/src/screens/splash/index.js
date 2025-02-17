import {ImageBackground, Text, StyleSheet} from 'react-native';
import React from 'react';
import {_getFromAsyncStorage} from '../../config/asyncStorage';

export default function SplashScreen({navigation}) {
  setTimeout(() => {
    checkUser();
  }, 2000);

  const checkUser = async () => {
    navigation.replace('home');
  };

  return (
    <ImageBackground
      source={require('../../assets/splashBg.jpg')}
      resizeMode="cover"
      style={styles.imageBackground}>
      <Text style={styles.text}>Ecommerce App</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },

  text: {
    fontWeight: 'bold',
    color: '#ffffff',
    fontSize: 24,
    paddingTop: 50,
  },
});
