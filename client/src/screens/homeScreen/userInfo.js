import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const userInfo = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <View style={styles.welcomeView}>
        <Text style={styles.welcomeText}>
          Welcome Back,{'\n'}
          <Text style={styles.userName} numberOfLines={1} adjustsFontSizeToFit>
            Shubham Phatale 👋
          </Text>
        </Text>
        <Text style={styles.subtext}>We've got you covered!</Text>
      </View>
      <View style={styles.imageView}>
        <Image source={require('../../assets/man.png')} style={styles.image} />
      </View>
    </View>
  );
};

export default userInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 120,
    marginTop: 10,
    marginHorizontal: 15,
  },

  welcomeView: {
    flex: 1,
    justifyContent: 'center',
  },

  welcomeText: {
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
  },

  userName: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    flexShrink: 1,
  },

  subtext: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
  },

  imageView: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
