import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput, ScrollView } from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigation } from '@react-navigation/native';

export default function Home({ route }) {
  const Navigation = useNavigation();
  const [nickname, setNickname] = useState('');

  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Header/>

      <Text>Enter player name</Text>
      <TextInput
        onChangeText={setNickname}
        value={nickname}
        placeholder="Nickname"
      />
      <Button
        title="Go to Game"
        onPress={() => Navigation.navigate(("Instructions"), {nickname: nickname})}
      />
      <Footer/>
    </View>
    </ScrollView>
  );
}
