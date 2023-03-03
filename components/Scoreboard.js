import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native'
// import header
// import footer
import Header from './Header'
import Footer from './Footer'
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game'


export default Scoreboard = ({ navigation }) => {

  const [scores, setScores] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('Focus', () => {
      getScoreboardData()
    })
    return unsubscribe
  }, [navigation])


  const getScoreboardData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY)
      if (jsonValue !== null){
        let tmpScores = JSON.parse(jsonValue);
        setScores(tmpScores);
      }
    }
    catch (error) {
      console.log('Read error: ' + error.message);
    }
  }

  return (
    <View>
        <Header />
        <View>
            {scores.map((player, i) => (
                <Text key={i}>{i + 1}. {player.name} {player.date} {player.time} {player.points} </Text>
            ))}
        </View>
        <Footer />
    </View>
  )
}