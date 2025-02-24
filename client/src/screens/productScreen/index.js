import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {axiosClient, PRODUCT} from '../../config/api';
import ImageScroller from './imageScroller';
import SpinnerComponent from '../../components/SpinnerComponent';

const ProductDetails = ({route}) => {
  const {productId} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchProductDetials();
  }, []);

  const fetchProductDetials = async () => {
    try {
      const response = await axiosClient.get(`${PRODUCT}/${productId}`);
      const data = response.data;
      console.log(data);

      setData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {!loading && data ? (
        <>
          <ImageScroller images={data.product.imageUrl} />
        </>
      ) : (
        <SpinnerComponent visible={loading} />
      )}
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
