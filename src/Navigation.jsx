import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {COLORS, FONTS} from './helpers/colors';
import BTenHomeScreen from './pages/BTenHomeScreen';
import BTenCartScreen from './pages/BTenCartScreen';
import BTenCartSuccessScreen from './pages/BTenCartSuccessScreen';
import BTenReservationScreen from './pages/BTenReservationScreen';
import BTenReservationSuccessScreen from './pages/BTenReserveSuccessScreen';
import BTenContactsScreen from './pages/BTenContactsScreen';
import BTenEventsScreen from './pages/BTenEventsScreen';
import BTenEventDetailScreen from './pages/BTenEventDetailScreen';
import BTenTranslationsScreen from './pages/BTenTranslationsScreen';
import CloseIcon from './assets/close_icon.png';
import CartIcon from './assets/cart_icon.png';
import Logo from './assets/logo.png';
import BackgroundImage from './assets/drawer_background.png';

const {width, height} = Dimensions.get('window');
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          width,
          height,
          backgroundColor: COLORS.white,
        },
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      {drawerScreens.map(({name, component}) => (
        <Drawer.Screen key={name} name={name} component={component} />
      ))}
    </Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  const navigation = useNavigation();

  const drawerItems = [
    {label: 'ГЛАВНАЯ', screen: 'BTenHomeScreen'},
    {label: 'КОРЗИНА', screen: 'BTenCartScreen'},
    {label: 'ТРАНСЛЯЦИИ', screen: 'BTenTranslationsScreen'},
    {label: 'КОНТАКТЫ', screen: 'BTenContactsScreen'},
    {label: 'РЕЗЕРВ СТОЛИКА', screen: 'BTenReservationScreen'},
    {label: 'СОБЫТИЯ', screen: 'BTenEventsScreen'},
  ];

  const navigateToScreen = screen => {
    navigation.navigate('DrawerNavigator', {screen});
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.container}>
      <View style={styles.closeIconContainer}>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <Image source={CloseIcon} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <View style={styles.mainContainer}>
        {drawerItems.map(({label, screen}) => (
          <TouchableOpacity
            key={screen}
            onPress={() => navigateToScreen(screen)}
            style={
              screen === 'BTenHomeScreen'
                ? styles.drawerItemFirst
                : styles.drawerItem
            }>
            <Text
              style={
                screen === 'BTenHomeScreen'
                  ? styles.itemTextFirst
                  : styles.itemText
              }>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={() => navigateToScreen('BTenCartScreen')}>
        <Image source={CartIcon} style={styles.cartIcon} />
      </TouchableOpacity>
    </ImageBackground>
  );
}

const drawerScreens = [
  {name: 'BTenHomeScreen', component: BTenHomeScreen},
  {name: 'BTenCartScreen', component: BTenCartScreen},
  {name: 'BTenCartSuccessScreen', component: BTenCartSuccessScreen},
  {name: 'BTenReservationScreen', component: BTenReservationScreen},
  {
    name: 'BTenReservationSuccessScreen',
    component: BTenReservationSuccessScreen,
  },
  {name: 'BTenContactsScreen', component: BTenContactsScreen},
  {name: 'BTenEventsScreen', component: BTenEventsScreen},
  {name: 'BTenEventDetailScreen', component: BTenEventDetailScreen},
  {name: 'BTenTranslationsScreen', component: BTenTranslationsScreen},
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
    height: height,
    width: width,
  },
  closeIconContainer: {
    position: 'absolute',
    left: 20,
    bottom: 40,
  },
  closeIcon: {
    width: 25,
    height: 25,
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginTop: 40,
  },
  logo: {
    width: width * 0.8,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  mainContainer: {
    marginTop: 40,
    alignItems: 'flex-end',
    width: width,
  },
  drawerItemFirst: {
    justifyContent: 'center',
    width: '90%',
    marginTop: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
  },
  drawerItem: {
    justifyContent: 'center',
    width: '90%',
    marginTop: 15,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderColor: COLORS.white,
  },
  itemText: {
    fontSize: 20,
    fontFamily: FONTS.black,
    color: COLORS.white,
    textAlign: 'left',
    paddingLeft: 10,
  },
  itemTextFirst: {
    fontSize: 20,
    fontFamily: FONTS.black,
    color: COLORS.main,
    textAlign: 'left',
    paddingLeft: 10,
  },
  cartIcon: {
    width: 60,
    height: 70,
    alignSelf: 'center',
    objectFit: 'contain',
    position: 'absolute',
    top: 100,
  },
});
