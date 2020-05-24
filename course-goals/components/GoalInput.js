import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function GoalInput(props) {
	const [goal, setGoal] = useState('');

	const handleInput = (text) => {
	  	setGoal(text);
	}

	const handleSubmit = () => {
		props.addGoalHandler(goal)
		setGoal('');
	}

	return (
		<View style={styles.inputContainer}>
	        <TextInput 
	        	placeholder="Course Goal" 
	        	style={styles.input}
	        	onChangeText={handleInput}
	        	value={goal} />
	        <Button title="ADD" onPress={handleSubmit} />
	     </View>
	)
}

const styles = StyleSheet.create({
  inputContainer: {
  	flexDirection: 'row', 
  	justifyContent: 'space-between', 
  	alignItems: 'center',
    marginBottom: 10
  },
  input: {
  	width: '75%', 
  	borderBottomColor: 'black', 
  	borderBottomWidth: 1, 
  	marginBottom: 10, 
  	padding: 5
  }
});