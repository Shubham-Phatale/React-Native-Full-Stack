import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {PRIMARYCOLOR} from '../../utils/constatns';
import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');

const ImageScroller = ({images}) => {
  const navigation = useNavigation();
  const scrollX = useSharedValue(0);
  const [liked, setLiked] = useState(false);
  const [paginationIndex, SetPaginationIndex] = useState(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollX.value = e.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({viewableItems}) => {
    if (
      viewableItems[0].index !== undefined &&
      viewableItems[0].index !== null
    ) {
      SetPaginationIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const renderImage = ({item}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item}} style={styles.image} />
    </View>
  );

  return (
    <View>
      <Animated.FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderImage}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />

      <View style={styles.heartContainer}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.backContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.paginationContainerOnImage}>
        {images.map((_, index) => {
          const paginationStyle = useAnimatedStyle(() => {
            const dotWidth = interpolate(
              scrollX.value,
              [(index - 1) * width, index * width, (index + 1) * width],
              [8, 20, 8],
              Extrapolation.CLAMP,
            );

            return {
              width: dotWidth,
            };
          });
          return (
            <Animated.View
              key={index}
              style={[
                styles.dotStyle,
                paginationStyle,
                {
                  backgroundColor:
                    paginationIndex === index ? PRIMARYCOLOR : '#aaa',
                },
              ]}></Animated.View>
          );
        })}
      </View>
    </View>
  );
};

export default ImageScroller;

const styles = StyleSheet.create({
  backContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'flex-start',
  },

  heartContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    borderRadius: 50,
    position: 'absolute',
    alignSelf: 'flex-end',
  },

  imageContainer: {
    width: width,
    height: height * 0.35,
    alignItems: 'center',
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  paginationContainerOnImage: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },

  dotStyle: {
    height: 8,
    width: 8,
    borderRadius: 8,
    marginHorizontal: 2,
    backgroundColor: '#888',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
