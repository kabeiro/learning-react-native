import React from "react";
import { View, StyleSheet } from "react-native";
import BodyText from "./BodyText";
import Colors from "../constants/colors";

export default function NumberContainer(props) {
  return (
    <View style={styles.container}>
      <BodyText style={styles.number}>{props.children}</BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  number: {
    fontSize: 20,
  },
});
