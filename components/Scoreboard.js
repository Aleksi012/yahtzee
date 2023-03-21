import { useState, useEffect } from "react";
import {Text, View} from "react-native";
import Header from "./Header";
import Footer from "./Footer";
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT } from '../constants/Game';
import { useNavigation } from '@react-navigation/native';
import { SCOREBOARD_KEY } from "../constants/Game";
import savePlayerPoints from "./Gameboard";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Scoreboard = ( {navigation} ) => {

    const Navigation = useNavigation();
    const [scores, setScores] = useState([]);

    useEffect(() => {
      const unsubscribe = Navigation.addListener("focus", () => {
          getScoreboardData();
      }); 
      return unsubscribe;
  }, []);

    const getScoreboardData = async () => {
      try {
          const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);

          console.log(jsonValue)
          if (jsonValue !== null) {
              let tmpScores = JSON.parse(jsonValue);
              setScores(tmpScores);
              scores.sort((a, b) => parseFloat(a.scores) - parseFloat(b.scores));
          }
      }
      catch (error) {
          console.log('Read error: ' + error.message);
      }
  }

  return (
    <View>
        <Header/>
        <View>
            {scores.map((player, i) => (
                <Text key={i}>{i + 1}. {player.name} {player.date} {player.time} {player.points}</Text>
            ))}
        </View>
        <Footer/>
    </View>
)

}