import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ClickableBox = ({ initialColor = '#3498db', clickedColor = '#2ecc71', title = 'Click Me' }) => {
  const [boxColor, setBoxColor] = useState(initialColor);

  const handlePress = () => {
    setBoxColor(prevColor => (prevColor === initialColor ? clickedColor : initialColor));
  };

  return (
    <TouchableOpacity style={[styles.box, { backgroundColor: boxColor }]} onPress={handlePress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClickableBox;
