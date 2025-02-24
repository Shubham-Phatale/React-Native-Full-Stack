import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const categories = ['Recommended', 'Trending', 'TopProducts'];

const ProductGrid = ({recommended, trending, topProducts}) => {
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState('Recommended');

  const onPressProduct = productId => {
    navigation.navigate('productDetails', {productId});
  };

  const getProductData = () => {
    switch (selectedItem) {
      case 'Trending':
        return trending;
      case 'TopProducts':
        return topProducts;
      default:
        return recommended;
    }
  };

  return (
    <View style={styles.productView}>
      <View style={styles.container}>
        <FlatList
          data={categories}
          keyExtractor={item => item}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[
                styles.item,
                selectedItem === item && styles.selectedItem,
              ]}
              onPress={() => setSelectedItem(item)}>
              <Text
                style={[
                  styles.text,
                  selectedItem === item && styles.selectedText,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={getProductData()}
        keyExtractor={item => item._id}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => onPressProduct(item._id)}>
            <View style={styles.cardView}>
              <Image source={{uri: item.imageUrl[0]}} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductGrid;

const styles = StyleSheet.create({
  productView: {
    margin: 15,
  },

  container: {
    alignItems: 'center',
    marginBottom: 10,
  },

  item: {
    marginHorizontal: 10,
    justifyContent: 'center',
  },

  selectedItem: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#eb8d36',
  },

  text: {
    color: 'grey',
    fontSize: 14,
  },

  selectedText: {
    color: '#eb8d36',
    fontWeight: 'bold',
  },

  row: {
    justifyContent: 'space-between',
  },

  cardView: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width / 2 - 32,
    height: width / 2,
  },

  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },

  itemDetails: {
    alignItems: 'flex-start',
    marginTop: 'auto',
  },

  name: {
    marginTop: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#eb8d36',
  },
});
