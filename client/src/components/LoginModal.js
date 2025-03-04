import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import LogInScreen from '../screens/logIn';

const LoginModal = forwardRef(({onLoginSuccess}, ref) => {
  const [visible, setVisible] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState(null);

  useImperativeHandle(ref, () => ({
    show: callback => {
      setOnSuccessCallback(() => callback);
      setVisible(true);
    },
    hide: () => setVisible(false),
  }));

  const handleLoginSuccess = () => {
    setVisible(false);
    if (onSuccessCallback) onSuccessCallback();
    if (onLoginSuccess) onLoginSuccess();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}>
      <View style={styles.modalContainer}>
        <LogInScreen onLoginSuccess={handleLoginSuccess} />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoginModal;
