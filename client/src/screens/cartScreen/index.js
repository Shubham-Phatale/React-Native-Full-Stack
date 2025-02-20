import {View, Text, Modal, StyleSheet} from 'react-native';
import React, {useContext, useState} from 'react';
import {AuthContext} from '../../config/authContext';
import LogInScreen from '../logIn'; // Import the Login Screen
import WelcomeScreen from '../welcome';

const CartScreen = () => {
  const [state] = useContext(AuthContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // If the user is not logged in, show the login modal
  if (state.user === undefined) {
    return (
      <View style={styles.container}>
        {/* Cart Screen UI */}
        <Text>Cart is empty or you need to log in to view your cart.</Text>

        {/* Display LoginModal if the user is not logged in */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={showLoginModal}
          onRequestClose={() => setShowLoginModal(false)}>
          <View style={styles.modalContainer}>
            <LogInScreen onLoginSuccess={() => setShowLoginModal(false)} />
          </View>
        </Modal>

        {/* Button to open LoginScreen */}
        <Text style={styles.loginText} onPress={() => setShowLoginModal(true)}>
          Login to proceed
        </Text>
      </View>
    );
  }

  // Render normal Cart Screen if the user is logged in
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    color: 'blue',
    marginTop: 20,
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
