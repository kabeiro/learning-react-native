import React from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

export default function GameOverScreen(props) {
  return (
    <View style={styles.screen}>
      <TitleText>Game Over!</TitleText>
      <Image style={styles.image} source={require("../assets/success.png")} />
      <View style={styles.textContainer}>
        <BodyText style={styles.text}>
          Your phone needed{" "}
          <Text style={styles.highlight}>{props.roundsNum} rounds</Text> to
          guess the number{" "}
          <Text style={styles.highlight}>{props.userChoice}</Text>.
        </BodyText>
      </View>
      <MainButton onPress={props.onRestart}>New Game</MainButton>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
    marginBottom: 20,
  },
  textContainer: {
    width: "75%",
    marginBottom: 15,
  },
  text: {
    textAlign: "center",
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold",
  },
});
