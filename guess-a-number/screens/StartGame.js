import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Card from "../components/Card";
import Input from "../components/Input";
import Colors from "../constants/colors";
import NumberContainer from "../components/NumberContainer";
import MainButton from "../components/MainButton";

const StartGame = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [selectedNum, setSelectedNum] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const [buttonWidth, setButtonWidth] = useState(Dimensions.get("window").width / 4);

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 4);
    }

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };

  const resetInput = () => {
    setEnteredValue("");
  };

  const confirmInput = () => {
    const chosenNum = parseInt(enteredValue);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid number!", "Please enter a number between 1 and 99", [
        { text: "Okay", style: "default", onPress: resetInput },
      ]);
      return;
    }
    setSelectedNum(chosenNum);
    setConfirmed(true);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText>You selected:</BodyText>
        <NumberContainer>{selectedNum}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNum)}>
          Start Game
        </MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <TitleText>Start a New Game!</TitleText>
            <Card style={styles.inputContainer}>
              <BodyText>Type a Number</BodyText>
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.secondary}
                    title="Reset"
                    onPress={resetInput}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    color={Colors.accent}
                    title="Confirm"
                    onPress={confirmInput}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  inputContainer: {
    minWidth: 300,
    maxWidth: "95%",
    width: "80%",
    alignItems: "center",
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  // button: {
  //   width: Dimensions.get("window").width / 4,
  // },
  input: {
    width: 50,
    textAlign: "center",
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});

export default StartGame;
