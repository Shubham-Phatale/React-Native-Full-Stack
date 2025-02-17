import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React, {useState} from 'react';
import RoundButtonComp from '../../components/RoundButtonComp';
import InputFieldComponent from '../../components/InputFieldComponent';
import SocialMediaButton from '../../components/SocialMediaButton';
import {axiosClient, REGISTER} from '../../config/api';
import SpinnerComponent from '../../components/SpinnerComponent';
import {showToast} from '../../components/ToastComponent';

export default function SignUpScreen({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);

  const signUpPressed = async () => {
    if (name == '' || email == '' || pass == '') {
      return console.log('Please Enter values');
    }

    setLoading(true);
    try {
      const body = {
        name: name,
        email: email,
        password: pass,
      };

      console.log(body);

      const {data, status} = await axiosClient.post(REGISTER, body);
      setLoading(false);
      showToast('success', data.message);
      if (status == 200) {
        console.log(data);
        navigation.replace('logIn');
      }
    } catch (error) {
      setLoading(false);
      showToast('error', error.response.data.message);
      console.log(error);
    }
  };

  const goToLogin = () => {
    navigation.replace('logIn');
  };

  return (
    <View style={styles.mainView}>
      <SpinnerComponent visible={loading} />
      <View style={styles.bgImageView}>
        <Image
          style={styles.bgImage}
          source={require('../../assets/signUp.jpg')}
          resizeMode="cover"
        />
      </View>
      <View style={styles.actionView}>
        <Text style={styles.header}>Lets get started!</Text>
        <View style={styles.signUpForm}>
          <InputFieldComponent
            placeHolder={'Name'}
            value={name}
            onChangeText={setName}
          />
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
        <View style={styles.buttonView}>
          <RoundButtonComp lable={'SignUp'} onPressed={() => signUpPressed()} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <Pressable onPress={() => goToLogin()}>
            <Text style={styles.registerText}>Login</Text>
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
