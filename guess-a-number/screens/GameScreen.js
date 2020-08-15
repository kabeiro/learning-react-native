import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
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
    <View key={guess} style={styles.list}>
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
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

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

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <BodyText>Opponent's Guess:</BodyText>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View style={styles.btnContainer}>
          <MainButton onPress={nextGuess.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
          <MainButton onPress={nextGuess.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
        </View>
      </Card>
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
    width: "60%",
  },
});
