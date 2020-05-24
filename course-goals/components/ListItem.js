import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function ListItem (props) {
	return (
	  <TouchableOpacity 
	  	activeOpacity={0.6} 
	  	onPress={props.onDelete.bind(this, props.id)}>
		  <View 
	        style={styles.listItem}>
	        <Text>{props.value}</Text>
	      </View>
      </TouchableOpacity>
	);
}

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#cceabb',
    borderColor: '#3f3f44',
    borderWidth: 1,
    borderRadius: 5
  }
});