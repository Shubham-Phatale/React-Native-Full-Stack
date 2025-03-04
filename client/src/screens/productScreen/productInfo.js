import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {PRIMARYCOLOR} from '../../utils/constants';

const ProductInfo = ({productDetails}) => {
  const renderStars = rating => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Ionicons
            key={i}
            name="star"
            size={18}
            color="#ffd700"
            style={styles.star}
          />,
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Ionicons
            key={i}
            name="star-half"
            size={18}
            color="#ffd700"
            style={styles.star}
          />,
        );
      } else {
        stars.push(
          <Ionicons
            key={i}
            name="star-outline"
            size={18}
            color="#ffd700"
            style={styles.star}
          />,
        );
      }
    }
    return stars;
  };

  const handlePress = () => {
    Linking.openURL(productDetails.website);
  };

  return (
    <View style={styles.infoView}>
      <Text style={styles.title}>{productDetails.name}</Text>
      <Text style={styles.price}>$ {productDetails.price}</Text>
      <Text style={styles.description}>{productDetails.description}</Text>
      <View style={styles.subHeader}>
        <View style={styles.ratingView}>
          <Text style={styles.ratingText}>
            {' '}
            {productDetails.ratings.toFixed(1)}
          </Text>
          {renderStars(productDetails.ratings)}
        </View>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.visitPage}>
            Visit {productDetails.manufacturer}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;

const styles = StyleSheet.create({
  infoView: {
    flexShrink: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
  },

  price: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: PRIMARYCOLOR,
  },

  description: {
    paddingTop: 5,
    fontSize: 12,
    color: 'grey',
    fontFamily: 'Poppins-Regular',
  },

  ratingView: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  star: {
    marginRight: 1,
  },

  ratingText: {
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'Poppins-Regular',
  },

  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  visitPage: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 14,
  },
});
