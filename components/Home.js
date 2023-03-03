import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput } from "react-native";
// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function HomeScreen({ navigation }) {
  
  const [firstname, setFirstname] = useState('');

  useEffect(() => {
    clearData();
  }, []);

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem('@firstname');
    } catch (e) {
      // saving error
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('firstname', value)
    } catch (e) {
      // saving error
    }
  }
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <TextInput
        onChangeText={setFirstname}
        value={firstname}
        placeholder="Firstname"
      />
      <Button
        title="OK"
        onPress={() => (storeData(), navigation.navigate("Gameboard"))}
      />
    </View>
  );
}

// <Button
//title="OK"
//onPress={() => navigation.navigate("Gameboard", {firstname: firstname}, storeData(firstname))}
///>