import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {AuthContext} from '../../config/authContext';
import LogInScreen from '../logIn';

const CartScreen = () => {
  const [state] = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    if (state.user) {
      setShowLoginModal(false);
    }
  }, [state.user]);

  if (state.user === undefined) {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontFamily: 'Poppins-Regular'}}>
          Log in to view your cart.
        </Text>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}>
          <View style={styles.modalContainer}>
            <LogInScreen onLoginSuccess={() => setShowLoginModal(false)} />
          </View>
        </Modal>

        <Text style={styles.loginText} onPress={() => setShowLoginModal(true)}>
          Login to proceed
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.cartContainer}>
      <Text style={{fontSize: 22, fontFamily: 'Poppins-Regular'}}>
        Welcome to your Cart!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loginText: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default CartScreen;
