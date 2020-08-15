import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, TouchableNativeFeedback } from "react-native";
import Colors from "../constants/colors";

export default function MainButton(props) {
  let ButtonComponent = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    ButtonComponent = TouchableNativeFeedback;
  }

  return (
    <View style={styles.btnContainer}>
      <ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: "white",
  },
});
