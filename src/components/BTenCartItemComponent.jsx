import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from './AppContext';
import {COLORS, FONTS, width} from '../helpers/colors';
import {bTenAllProducts} from '../helpers/bTenProducts';
import PlusIcon from '../assets/plus_icon.png';
import MinusIcon from '../assets/minus_icon.png';

const BTenCartItemComponent = ({item}) => {
  const {shouldRefresh, toggleRefresh} = useContext(AppContext);
  const [carts, setCarts] = useState([]);

  const updateCart = async updatedCarts => {
    await AsyncStorage.setItem('cartList', JSON.stringify(updatedCarts));
    setCarts(updatedCarts);
    toggleRefresh(!shouldRefresh);
  };
  const increment = () => {
    const updatedCarts = carts.map(product =>
      product.name === item.name
        ? {...product, count: product.count + 1}
        : product,
    );
    updateCart(updatedCarts);
  };

  const decrement = () => {
    const updatedCarts = carts
      .map(product => {
        if (product.name === item.name) {
          const newCount = Math.max(product.count - 1, 0);
          return {...product, count: newCount};
        }
        return product;
      })
      .filter(product => product.count > 0); // Remove item if count is zero
    updateCart(updatedCarts);
  };

  const deleteItem = () => {
    const updatedCarts = carts.filter(product => product.name !== item.name);
    updateCart(updatedCarts);
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartList = await AsyncStorage.getItem('cartList');
      setCarts(cartList ? JSON.parse(cartList) : []);
    };
    fetchCartItems();
  }, [shouldRefresh]);

  const productImage = bTenAllProducts.find(p => p.name === item.name)?.image;

  return (
    <View style={styles.container}>
      <Image source={productImage} style={styles.image} />

      <View style={styles.details}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.row}>
          <View style={styles.countContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() =>
                carts.find(product => product.name === item.name)?.count > 1
                  ? decrement()
                  : deleteItem()
              }>
              <Image source={MinusIcon} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.count}>
              {carts.find(product => product.name === item.name)?.count || 0}
            </Text>

            <TouchableOpacity style={styles.actionButton} onPress={increment}>
              <Image source={PlusIcon} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.currencyText}>{`${item.price}.00 $`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    width: width * 0.95,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    elevation: 5,
    borderRadius: 12,
  },
  image: {
    width: '45%',
    height: 140,
    borderRadius: 12,
    marginTop: 8,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    paddingTop: 10,
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.black,
    width: '90%',
  },
  description: {
    fontSize: 14,
    fontFamily: FONTS.light,
    color: COLORS.black,
    width: '90%',
    marginTop: 1,
  },
  currencyText: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    textAlign: 'center',
    verticalAlign: 'middle',
    marginLeft: 25,
    color: COLORS.main,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width * 0.2,
  },
  count: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    marginHorizontal: 10,
    color: COLORS.main,
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
  },
  plusMinus: {
    textAlign: 'center',
    verticalAlign: 'middle',
    color: COLORS.white,
    fontSize: 18,
    fontFamily: FONTS.black,
  },
  deleteButton: {
    marginLeft: 10,
    position: 'absolute',
    right: 10,
    bottom: 5,
  },
  icon: {
    width: 25,
    height: 25,
    objectFit: 'contain',
  },
});

export default BTenCartItemComponent;
