import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ListItem from './components/ListItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [goals, setGoals] = useState([]);

  const goalInputHandler = text => {
  	setGoal(text);
  }

  const addGoalHandler = goal => {
  	setGoals(currentGoals => [...currentGoals, { 
      id: Math.random().toString(), 
      value: goal 
    }]);
  }

  const deleteGoalHandler = goalId => {
    setGoals(currentGoals => {
      return currentGoals.filter(el => el.id !== goalId)
    });
  }

  return (
    <View style={styles.screen}>
      <GoalInput 
        addGoalHandler={addGoalHandler} />
      <FlatList 
        keyExtractor={(item, index) => item.id}
        data={goals} 
        renderItem={itemData => (
          <ListItem 
            id={itemData.item.id} 
            value={itemData.item.value} 
            onDelete={deleteGoalHandler} />
          )} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
  	padding: 50
  },
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
