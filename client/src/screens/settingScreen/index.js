import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import {AuthContext} from '../../config/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('window').width;

const SettingScreen = () => {
  const [state, setState] = useContext(AuthContext);

  const settingsOptions = [
    {
      title: 'Account',
      image: require('../../assets/user.png'),
      action: () => handleAccount(),
    },
    {
      title: 'Notifications',
      image: require('../../assets/notification.png'),
      action: () => handleNotifications(),
    },
    {
      title: 'Appearance',
      image: require('../../assets/themes.png'),
      action: () => handleAppearance(),
    },
    {
      title: 'Help & Support',
      image: require('../../assets/support.png'),
      action: () => handleHelpSupport(),
    },
    {
      title: 'About',
      image: require('../../assets/about.png'),
      action: () => handleAbout(),
    },
  ];

  if (state.user) {
    settingsOptions.push({
      title: 'Log Out',
      image: require('../../assets/logout.png'),
      action: () => handleLogout(),
    });
  }

  const handleAccount = () => {
    Alert.alert('Account', 'Navigate to Account Settings');
  };

  const handleNotifications = () => {
    Alert.alert('Notifications', 'Navigate to Notification Settings');
  };

  const handleAppearance = () => {
    Alert.alert('Appearance', 'Navigate to Appearance Settings');
  };

  const handleHelpSupport = () => {
    Alert.alert('Help & Support', 'Navigate to Help & Support');
  };

  const handleAbout = () => {
    Alert.alert('About', 'Navigate to About Page');
  };

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to Logout', [
      {text: 'Cancel'},
      {
        text: 'LOGOUT',
        onPress: async () => {
          setState({user: null});
          await AsyncStorage.removeItem('user');
          console.log('Logged Out');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <FlatList
        data={settingsOptions}
        keyExtractor={item => item.title}
        renderItem={({item}) => (
          <TouchableOpacity style={styles.card} onPress={item.action}>
            <Image style={styles.cardImage} source={item.image} />
            <Text
              style={[
                styles.cardText,
                item.title === 'Log Out' && {color: 'red'},
              ]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  cardImage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },

  cardText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SettingScreen;
