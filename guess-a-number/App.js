import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Header from "./components/Header";
import StartGame from "./screens/StartGame";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

function fetchFonts() {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
}

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  function restartGame() {
    setGuessRounds(0);
    setUserNumber(null);
  }

  function startGame(selectedNumber) {
    setUserNumber(selectedNumber);
  }

  function gameOver(numOfRounds) {
    setGuessRounds(numOfRounds);
  }

  let content = <StartGame onStartGame={startGame} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOver} />;
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userChoice={userNumber}
        roundsNum={guessRounds}
        onRestart={restartGame}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="guess-a-number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
