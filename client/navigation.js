import {View, Text} from 'react-native';
import React from 'react';
import {AuthProvider} from './src/config/authContext';
import ScreenNavigators from './src/components/ScreenNavigators';

const RootNavigation = () => {
  return (
    <AuthProvider>
      <ScreenNavigators />
    </AuthProvider>
  );
};

export default RootNavigation;
