import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ExploreScreen from '../screens/exploreScreen';
import HomeScreen from '../screens/homeScreen';
import CartScreen from '../screens/cartScreen';
import SettingScreen from '../screens/settingScreen';
import LogInScreen from '../screens/logIn';
import SignUpScreen from '../screens/signUp';
import SplashScreen from '../screens/splash';
import WelcomeScreen from '../screens/welcome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetailScreen from '../screens/productScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="homeScreen"
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#eb8d36'}}>
      <Tab.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="explore"
        component={ExploreScreen}
        options={{
          title: 'Explore',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="compass-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="bag-remove-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="setting"
        component={SettingScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({size, color}) => (
            <Ionicons name="reorder-three-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const ScreenNavigators = () => {
  return (
    <Stack.Navigator
      initialRouteName="splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="splash" component={SplashScreen} />
      <Stack.Screen name="welcome" component={WelcomeScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="logIn" component={LogInScreen} />
      <Stack.Screen name="home" component={HomeTabs} />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default ScreenNavigators;
