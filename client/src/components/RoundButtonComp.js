import {StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';

export default function RoundButtonComp({lable, isBorder = false, onPressed}) {
  return (
    <Pressable
      style={isBorder ? styles.outlinedButton : styles.filledButton}
      onPress={() => onPressed()}>
      <Text style={[styles.buttonText, isBorder && {color: '#000000'}]}>
        {lable}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filledButton: {
    flex: 1,
    backgroundColor: '#eb8d36',
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    borderColor: '#eb8d36',
  },

  outlinedButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 12,
    borderColor: '#000000',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});
