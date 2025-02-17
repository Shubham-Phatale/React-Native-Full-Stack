import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import SocialMediaButton from '../../components/SocialMediaButton';

export default function WelcomeScreen({navigation}) {
  const loginPressed = () => {
    navigation.navigate('logIn');
  };

  const signUpPressed = () => {
    navigation.navigate('signUp');
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.bgImageView}>
        <Image
          style={styles.bgImage}
          source={require('../../assets/welcome.jpg')}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.actionView}>
        <Text style={styles.h1}>Hello!</Text>
        <Text style={styles.h3}>
          Welcome to my Ecommerce Platform get all you need right here.
        </Text>
        <View style={styles.buttonView}>
          <RoundButtonComp lable={'Login'} onPressed={() => loginPressed()} />
          <RoundButtonComp
            lable={'SignUp'}
            isBorder={true}
            onPressed={() => signUpPressed()}
          />
        </View>
        <Text style={styles.otherOption}>Or via social media</Text>
        <View style={styles.socialMediaView}>
          <SocialMediaButton
            image={require('../../assets/fb.png')}
            color="#2d75e8"
          />
          <SocialMediaButton
            image={require('../../assets/google.png')}
            color="#e54545"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },

  bgImageView: {
    flex: 0.5,
  },

  bgImage: {
    width: '100%',
    height: '100%',
  },

  actionView: {
    flex: 0.5,
    backgroundColor: '#fefeff',
  },

  h1: {
    fontSize: 30,
    marginTop: '8%',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  h3: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333',
    textAlign: 'center',
    paddingVertical: '5%',
    paddingHorizontal: '15%',
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    paddingTop: '7%',
    paddingHorizontal: '7%',
  },

  otherOption: {
    marginTop: '15%',
    textAlign: 'center',
    fontSize: 14,
    color: 'grey',
  },

  socialMediaView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: '3%',
  },
});
