import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('window');

const HeaderSlider = ({banners = []}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={banners}
        horizontal
        keyExtractor={item => item._id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 10}}
        renderItem={({item}) => (
          <View style={styles.carouselBox}>
            <Image
              source={{uri: item.imageUrl}}
              style={styles.bannerImage}
              resizeMode="stretch"
            />
          </View>
        )}
      />
    </View>
  );
};

export default HeaderSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  carouselBox: {
    width: width - 50,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
