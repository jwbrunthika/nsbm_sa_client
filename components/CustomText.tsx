import React from 'react';
import { Text, TextProps } from 'react-native';

const CustomText = (props: TextProps) => (
  <Text {...props} style={[{ fontFamily: 'AlbertSans-VariableFont_wght' }, props.style]} />
);

export default CustomText;
