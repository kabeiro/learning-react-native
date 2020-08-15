import React from "react";
import { Text, StyleSheet } from "react-native";
import Colors from "../constants/colors";

export default function TitleText(props) {
  return (
    <Text style={{ ...styles.title, ...props.style }}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    color: Colors.secondary,
  },
});
