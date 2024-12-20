import React from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import BTenHeader from '../components/BTenHeader';
import BTenComponent from '../components/BTenComponent';
import SuccessIcon from '../assets/success_icon.png';
export default function () {
  const navigation = useNavigation();

  const handleNavigateHome = () => {
    navigation.navigate('DrawerNavigator', {screen: 'BTenHomeScreen'});
  };

  return (
    <View style={styles.container}>
      <BTenHeader />

      <Image
        source={SuccessIcon}
        style={{
          width: width * 0.5,
          height: width * 0.5,
          alignSelf: 'center',
          objectFit: 'contain',
          marginTop: '15%',
        }}
      />

      <Text style={styles.text}>Спасибо за {'\n'} заказ!</Text>

      <View style={styles.qrContainer}>
        <QRCode
          value="https://sportsbarr.orgs.biz/"
          size={Dimensions.get('window').width / 2.5}
          color={COLORS.black}
        />
      </View>

      <BTenComponent
        text="На главную"
        style={styles.button}
        onPress={handleNavigateHome}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
    backgroundColor: COLORS.white,
  },
  qrContainer: {
    alignItems: 'center',
    marginTop: '15%',
  },
  button: {
    position: 'absolute',
    bottom: 50,
  },
  successIcon: {
    marginTop: 20,
    width: width * 0.5,
    height: width * 0.5,
    objectFit: 'contain',
    alignSelf: 'center',
  },
  text: {
    color: COLORS.black,
    textAlign: 'center',
    fontFamily: FONTS.black,
    fontSize: 25,
    marginTop: '5%',
    paddingVertical: 15,
  },
  image: {
    width: width * 0.35,
    height: width * 0.35,
    alignSelf: 'center',
    objectFit: 'contain',
    marginTop: 20,
  },
});
