import React, {useContext, useEffect, useState, useCallback} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import PlusIcon from '../assets/plus_icon.png';
import MinusIcon from '../assets/minus_icon.png';

export default function ({item}) {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [added, setAdded] = useState(false);

  const updateCart = useCallback(async () => {
    const cartList = await AsyncStorage.getItem('cartList');
    const cartArray = cartList ? JSON.parse(cartList) : [];
    const isProductInCart = cartArray.some(cart => cart.name === item.name);
    setAdded(isProductInCart);
  }, [item.name]);

  const handleCartUpdate = async action => {
    const cartList = await AsyncStorage.getItem('cartList');
    let cartArray = cartList ? JSON.parse(cartList) : [];

    if (action === 'add') {
      if (!cartArray.some(cart => cart.name === item.name)) {
        cartArray.push({...item, count: 1});
      }
    } else if (action === 'remove') {
      cartArray = cartArray.filter(cart => cart.name !== item.name);
    }

    await AsyncStorage.setItem('cartList', JSON.stringify(cartArray));
    toggleRefresh(prev => !prev);
  };

  const toggleCart = () => {
    added ? handleCartUpdate('remove') : handleCartUpdate('add');
  };

  useEffect(() => {
    updateCart();
  }, [updateCart, shouldRefresh]);

  return (
    <View style={styles.main}>
      <Image source={item?.image} style={styles.image} />

      <View
        style={{
          width: '90%',
          justifyContent: 'space-between',
          marginLeft: 10,
          height: 140,
        }}>
        <Text style={styles.title}>{item?.name}</Text>

        <Text style={styles.description}>{item?.description}</Text>

        <View style={styles.row}>
          <Text style={styles.price}>{item?.price}.00 $</Text>

          <TouchableOpacity onPress={toggleCart}>
            <Image
              style={styles.button}
              source={added ? MinusIcon : PlusIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '48%',
    alignSelf: 'center',
    height: 300,
    marginTop: 35,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    elevation: 5,
    borderRadius: 12,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 12,
    alignSelf: 'center',
    marginTop: 15,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '100%',
  },
  description: {
    fontSize: 12,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.main,
    borderRadius: 8,
  },
  button: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
});
