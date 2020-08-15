import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, Text, ScrollView } from "react-native";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

export default function GameOverScreen(props) {
  const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceWidth(Dimensions.get('window').width);
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>Game Over!</TitleText>
        <Image
          style={{
            width: availableDeviceWidth * 0.7,
            height: availableDeviceWidth * 0.7,
            borderRadius: availableDeviceWidth * 0.7 / 2,
            marginVertical: availableDeviceHeight / 30,
          }}
          source={require("../assets/success.png")} />
        <View style={{ ...styles.textContainer, marginBottom: availableDeviceHeight / 60 }}>
          <BodyText style={{ ...styles.text, fontSize: availableDeviceHeight < 400 ? 16 : 20 }}>
            Your phone needed{" "}
            <Text style={styles.highlight}>{props.roundsNum} rounds</Text> to
          guess the number{" "}
            <Text style={styles.highlight}>{props.userChoice}</Text>.
        </BodyText>
        </View>
        <MainButton onPress={props.onRestart}>New Game</MainButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 10
  },
  textContainer: {
    width: "75%",
  },
  text: {
    textAlign: "center",
  },
  highlight: {
    color: Colors.accent,
    fontFamily: "open-sans-bold",
  },
});
