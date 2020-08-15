import React from "react";
import { View, StyleSheet } from "react-native";
import TitleText from "./TitleText";
import Colors from "../constants/colors";
import { Entypo } from "@expo/vector-icons";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <TitleText style={styles.title}>{props.title} </TitleText>
      <Entypo name="emoji-flirt" size={22} color="black" />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: 90,
    paddingTop: 32,
    marginBottom: 15,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "black",
    fontSize: 22,
  },
});

export default Header;
