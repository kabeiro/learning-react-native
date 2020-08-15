import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/colors";

export default function MainButton(props) {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.text}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
