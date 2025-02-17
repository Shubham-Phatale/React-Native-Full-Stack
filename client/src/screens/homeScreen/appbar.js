import {Image, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Appbar = () => {
  return (
    <View style={styles.appBar}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
      <View style={styles.appBarContent}>
        <View style={styles.titleArea}>
          <Text style={styles.titleText}>Techon</Text>
          <Text style={styles.subtitleText}>Get all your tech right here!</Text>
        </View>
        <View style={styles.searchArea}>
          <Ionicons name="search" size={20} color={'#eb8d36'} />
        </View>
      </View>
    </View>
  );
};

export default Appbar;

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    height: '08%',
    margin: 10,
    alignItems: 'center',
  },

  logo: {
    width: 40,
    height: 40,
  },

  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  titleArea: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  titleText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'Shrikhand-Regular',
  },

  subtitleText: {
    color: 'black',
    fontSize: 12,
  },

  searchArea: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
