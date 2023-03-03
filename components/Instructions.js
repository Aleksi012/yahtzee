import React, { useState, useEffect } from "react";
import { Button, View, Text, TextInput, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from "../style/style";
import { useRoute } from '@react-navigation/native'



export default Instructions = ({ route }) => {
    
    const Navigation = useNavigation();
    const [playerName, setPlayerName] = useState('')
    const [nickname, setNickname] = useState('')

    useEffect (() => {
        if (playerName === "" && route.params?.nickname) {
          setPlayerName(route.params?.nickname);
          // getScoreboardData();
          console.log(route.params?.nickname);
          console.log(playerName)
        }
    
      }, []);
    
    return ( <ScrollView>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

            <Text>
            THE GAME: Upper section of the classic Yahtzee 
                    dice game. You have NBR_OF_DICES dices and 
                    for the every dice you have NBR_OF_THROWS 
                    throws. After each throw you can keep dices in 
                    order to get same dice spot counts as many as 
                    possible. In the end of the turn you must select 
                    your points from MIN_SPOT to MAX_SPOT. 
                    Game ends when all points have been selected. 
                    The order for selecting those is free.
                    POINTS: After each turn game calculates the sum 
                    for the dices you selected. Only the dices having 
                    the same spot count are calculated. Inside the 
                    game you can not select same points from 
                    MIN_SPOT to MAX_SPOT again.
                    GOAL: To get points as much as possible. 
                    BONUS_POINTS_LIMIT points is the limit of 
                    getting bonus which gives you BONUS_POINTS
                    points more.  
            </Text>
            <Button
        title="Go to Game"
        onPress={() => Navigation.navigate(("Gameboard"), {nickname: nickname})}/>
        <Text>Good Luck! {playerName}</Text>
        </View>
        </ScrollView>

    )
  }