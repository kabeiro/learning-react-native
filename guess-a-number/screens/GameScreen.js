import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import Colors from "../constants/colors";

function generateRandomBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

function itemList(guess, index) {
  return (
    <View key={guess} style={{ ...styles.list, width: deviceWidth > 500 ? "60%" : '80%' }}>
      <BodyText>#{index}</BodyText>
      <BodyText>{guess}</BodyText>
    </View>
  );
}

export default function GameScreen(props) {
  const { userChoice, onGameOver } = props;
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width);
  const [deviceHeight, setDeviceHeight] = useState(Dimensions.get('window').height);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setDeviceWidth(Dimensions.get('window').width);
      setDeviceHeight(Dimensions.get('window').height);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  })

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  function nextGuess(direction) {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNum = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNum);
    setPastGuesses((curGuesses) => [nextNum, ...curGuesses]);
  }

  let gameControls = (
    <Card style={styles.card}>
      <BodyText>Opponent's Guess:</BodyText>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View style={{ ...styles.btnContainer, marginTop: deviceHeight > 600 ? 20 : 5 }}>
        <MainButton onPress={nextGuess.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuess.bind(this, "greater")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </View>
    </Card>
  )

  if (deviceHeight < 500) {
    gameControls = (
      <>
        <BodyText>Opponent's Guess:</BodyText>
        <View style={styles.controls}>
          <MainButton onPress={nextGuess.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton onPress={nextGuess.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </>
    )
  }

  return (
    <View style={styles.screen}>
      {gameControls}
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {pastGuesses.map((guess, index) =>
            itemList(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  card: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    width: "70%",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    alignItems: 'center'
  },
  listContainer: {
    width: "80%",
    flex: 1,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  list: {
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
