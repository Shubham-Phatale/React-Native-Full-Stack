import {View, Image, StyleSheet, Text, Pressable} from 'react-native';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../../config/authContext';
import SpinnerComponent from '../../components/SpinnerComponent';
import InputFieldComponent from '../../components/InputFieldComponent';
import RoundButtonComp from '../../components/RoundButtonComp';
import SocialMediaButton from '../../components/SocialMediaButton';
import {axiosClient, LOGIN} from '../../config/api';
import {_storeInToAsyncStorage} from '../../config/asyncStorage';
import {showToast} from '../../components/ToastComponent';
import {useNavigation} from '@react-navigation/native';

export default function LogInScreen() {
  const [state, setState] = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const logInPressed = async () => {
    if (email == '' || pass == '') {
      return console.log('Please Enter values');
    }

    setLoading(true);
    try {
      const body = {
        email: email,
        password: pass,
      };

      console.log(body);

      const {data, status} = await axiosClient.post(LOGIN, body);
      setLoading(false);
      showToast('success', data.message);
      if (status == 200) {
        setState(data);
        _storeInToAsyncStorage('user', JSON.stringify(data));
        navigation.goBack();
      }
    } catch (error) {
      setLoading(false);
      showToast('error', error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const goToRegister = () => {
    navigation.replace('signUp');
  };

  return (
    <View style={styles.mainView}>
      <SpinnerComponent visible={loading} />
      <View style={styles.bgImageView}>
        <Image
          style={styles.bgImage}
          source={require('../../assets/logIn.jpg')}
          resizeMode={'cover'}
        />
      </View>
      <View style={styles.actionView}>
        <Text style={styles.header}>LogIn Here!</Text>
        <View style={styles.signUpForm}>
          <InputFieldComponent
            placeHolder={'Email'}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            validator={text => {
              return /\S+@\S+\.\S+/.test(text) ? '' : 'Invalid email address';
            }}
          />
          <InputFieldComponent
            placeHolder={'Password'}
            secureTextEntry={true}
            value={pass}
            onChangeText={setPass}
            validator={text => {
              return text.length >= 6
                ? ''
                : 'Password must be at least 6 characters';
            }}
          />
        </View>
        <Text style={[styles.registerText, {textAlign: 'right'}]}>
          Forgot Password?
        </Text>
        <View style={styles.buttonView}>
          <RoundButtonComp label={'Login'} onPressed={() => logInPressed()} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Don't have an account? </Text>
          <Pressable onPress={() => goToRegister()}>
            <Text style={styles.registerText}>Register</Text>
          </Pressable>
        </View>
        <Text style={styles.socialText}>Or Signup via social account</Text>
        <View style={styles.socialMediaView}>
          <SocialMediaButton
            image={require('../../assets/fb.png')}
            color="#2d75e8"
          />
          <SocialMediaButton
            image={require('../../assets/google.png')}
            color="#e54545"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    width: '100%',
  },

  bgImageView: {
    flex: 0.35,
  },

  bgImage: {
    width: '100%',
    height: '100%',
  },

  actionView: {
    flex: 0.65,
    backgroundColor: '#fefeff',
    justifyContent: 'center',
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: '10%',
  },

  signUpForm: {
    width: '100%',
    gap: 15,
  },

  buttonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '7%',
    paddingHorizontal: '7%',
  },

  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
  },

  text: {
    fontSize: 16,
    color: '#000',
  },

  registerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E90FF',
  },

  socialText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    paddingTop: 20,
  },

  socialMediaView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    paddingTop: '3%',
  },
});
