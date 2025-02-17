import React, {createContext, useState, useEffect} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const [state, setState] = useState({
    user: null,
  });

  useEffect(() => {
    const loadLocalStorageData = async () => {
      let user = await AsyncStorage.getItem('user');
      let parsedUser = JSON.parse(user);
      setState({...state, user: parsedUser?.user});
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
