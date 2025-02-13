import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

const FacultyCard = ({ imageSource, title, subtitle, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
    >
      <ImageBackground
        source={imageSource}
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 10 }}
        blurRadius={isPressed ? 10 : 0} // Apply blur when pressed
      >
        <View style={styles.overlay} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 300,
    height: 150,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#D1EED5',
    opacity: 0.6,
  },
  textContainer: {
    paddingTop: '30%',
    paddingLeft: '5%',
  },
  title: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
    fontStyle: 'italic',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '300',
    color: '#000000',
    fontStyle: 'italic',
  },
});

export default FacultyCard;
