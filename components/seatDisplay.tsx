import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SeatDisplayBox = ({ imageSource, title, seatAvailability, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.seatAvailability}>{seatAvailability} Seat Availability</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    width: '90%',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoContainer: {
    flex: 2,
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seatAvailability: {
    fontSize: 16,
    color: '#555',
  },
});

export default SeatDisplayBox;
