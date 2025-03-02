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
        <Text style={styles.seatNumber}>{seatAvailability}</Text>
        <Text style={styles.seatText}>Seat Availability</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    marginVertical: 10,
    width: '95%',
    height: "30%",
    alignSelf: 'center',
    elevation: 2,
  },
  imageContainer: {
    flex: 1.2,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    // width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    // height: '50%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    flex: 1,
    // height: "50%",
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
    backgroundColor: '#E5E7EB',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '300',
    color: '#1F2937',
    marginBottom: 8,
  },
  seatNumber: {
    fontSize: 36,
    fontWeight: '300',
    color: '#374151',
  },
  seatText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default SeatDisplayBox;
