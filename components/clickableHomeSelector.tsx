import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ClickableCircle = ({
  initialColor = "#AFD9AF",
  clickedColor = "#AFD9AF",
  title = "Click Me",
  size = 100,
  sizew = 136,
}) => {
  const [boxColor, setBoxColor] = useState(initialColor);

  const handlePress = () => {
    setBoxColor((prevColor) =>
      prevColor === initialColor ? clickedColor : initialColor,
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.box,
        { backgroundColor: boxColor, height: size, width: sizew },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 3,
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ClickableCircle;
