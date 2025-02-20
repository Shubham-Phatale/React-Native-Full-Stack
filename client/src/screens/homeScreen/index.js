import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import Appbar from './appbar';
import HeaderSlider from './headerSlider';
import UserData from './userInfo';
import {axiosClient, HOME} from '../../config/api';
import SpinnerComponent from '../../components/SpinnerComponent';
import {AuthContext} from '../../config/authContext';
import ProductGrid from './ProductsGrid';

export default function HomeScreen() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [state] = useContext(AuthContext);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosClient.get(HOME);
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
    <View style={styles.mainView}>
      <Appbar />
      {!loading && data ? (
        <>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <HeaderSlider banners={data.banners} />
            {state.user !== undefined && <UserData info={state.user} />}
            <View style={styles.border}></View>
            <ProductGrid
              recommended={data.recommended}
              trending={data.trending}
              topProducts={data.topProducts}
            />
          </ScrollView>
        </>
      ) : (
        <SpinnerComponent visible={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scrollView: {
    flexGrow: 1,
  },

  border: {
    marginTop: 20,
    marginHorizontal: 20,
    height: 1,
    borderRadius: 10,
    backgroundColor: '#e8e8e8',
  },
});
