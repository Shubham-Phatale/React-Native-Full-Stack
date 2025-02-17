import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function SocialMediaButton({image, color}) {
  return (
    <View style={[{backgroundColor: color}, styles.container]}>
      <Image style={{width: 20, height: 20}} source={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
