import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProductInfo = ({title, rating}) => {
  return (
    <View style={styles.infoView}>
      <Text>{title}</Text>
      <Text>{rating}</Text>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({});
