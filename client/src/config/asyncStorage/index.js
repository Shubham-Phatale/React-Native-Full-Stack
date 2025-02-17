import AsyncStorage from '@react-native-async-storage/async-storage';

export const _storeInToAsyncStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log('Error in storing data to Async Storage');
  }
};

export const _getFromAsyncStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return value;
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error in getting data to Async Storage');
    return null;
  }
};
