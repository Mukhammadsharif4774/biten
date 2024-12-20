import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLORS, FONTS, height, width} from '../helpers/colors';
import BTenHeader from '../components/BTenHeader';
import {useNavigation} from '@react-navigation/native';
import Event_1 from '../assets/event_1.png';
import Event_2 from '../assets/event_2.png';
import Event_3 from '../assets/event_3.png';
import Event_4 from '../assets/event_4.png';
import Mask_1 from '../assets/event_mask_1.png';
import Mask_2 from '../assets/event_mask_2.png';
import Mask_3 from '../assets/event_mask_3.png';
import Mask_4 from '../assets/event_mask_4.png';

const events = [
  {mask: Mask_1, image: Event_1},
  {mask: Mask_2, image: Event_2},
  {mask: Mask_3, image: Event_3},
  {mask: Mask_4, image: Event_4},
];

const EventButton = ({image, onPress, mask}) => (
  <>
    <TouchableOpacity style={styles.button} onPress={() => onPress(image)}>
      <Image source={mask} style={styles.image} />
    </TouchableOpacity>
  </>
);

export default function () {
  const navigation = useNavigation();

  const handlePress = image => {
    navigation.navigate('DrawerNavigator', {
      screen: 'BTenEventDetailScreen',
      params: {image},
    });
  };

  return (
    <View style={styles.container}>
      <BTenHeader />

      <View style={styles.content}>
        {events.map((event, index) => (
          <EventButton
            key={index}
            image={event.image}
            mask={event.mask}
            onPress={handlePress}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    width: width,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    objectFit: 'contain',
    width: width * 0.8,
    height: 150,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: FONTS.bold,
    color: COLORS.white,
    textAlign: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    width: width,
    marginTop: '10%',
  },
  time: {
    marginTop: 15,
    marginBottom: 3,
    color: COLORS.black,
    fontSize: 18,
    fontFamily: FONTS.regular,
    width: '100%',
    textAlign: 'center',
  },
});
