import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {axiosClient, PRODUCT} from '../../config/api';
import ImageScroller from './imageScroller';
import SpinnerComponent from '../../components/SpinnerComponent';
import ProductInfo from './productInfo';
import RoundButtonComp from '../../components/RoundButtonComp';
import ProductDetails from './productDetails';
import {AuthContext} from '../../config/authContext';
import LoginModal from '../../components/LoginModal';

const ProductDetailScreen = ({route}) => {
  const {productId} = route.params;
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [state] = useContext(AuthContext);
  const loginModalRef = useRef(null);
  const [isInCart, setIsInCart] = useState(false);

  const addToCartPressed = () => {
    console.log(state.user);
    if (state.user === undefined || state.user === null) {
      loginModalRef.current?.show(() => {
        addToCart();
      });
    } else {
      addToCart();
    }
  };

  const addToCart = async () => {
    try {
      setLoading = true;
      const body = {
        email: email,
        password: pass,
      };
      const response = await axiosClient.post();
    } catch (error) {}
  };

  const buyNowPressed = () => {};

  useEffect(() => {
    fetchProductDetials();
  }, []);

  const fetchProductDetials = async () => {
    try {
      const response = await axiosClient.get(`${PRODUCT}/${productId}`);
      const data = response.data;
      console.log(data);

      setData(data.product);
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
          <ScrollView contentContainerStyle={styles.scrollView}>
            <ImageScroller images={data.images} />
            <ProductInfo productDetails={data} />
            <View style={styles.buttonView}>
              <RoundButtonComp
                label={'Buy Now'}
                onPressed={() => buyNowPressed()}
              />
              <RoundButtonComp
                label={'Add to Cart'}
                isBorder={true}
                onPressed={() => addToCartPressed()}
              />
            </View>
            <ProductDetails details={data.details} />
          </ScrollView>
          <LoginModal ref={loginModalRef} onLoginSuccess={addToCart} />
        </>
      ) : (
        <SpinnerComponent visible={loading} />
      )}
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollView: {
    flexGrow: 1,
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 20,
    paddingHorizontal: '7%',
  },
});
