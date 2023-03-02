import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;
const WINNING_POINTS = 23;

export default Gameboard = () => {

  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [nbrOfWins, setNbrOfWins] = useState(0);
  const [sum, setSum] = useState(0);
  const [status, setStatus] = useState('');

  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <MaterialCommunityIcons 
        name={board[i]}
        key={"row" + i}
        size={50}
        color={"steelblue"}
      />
    );
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsleft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS-1);
      setNbrOfWins(0);
    }
  }, [nbrOfThrowsleft]);

  const throwDices = () => {
    let sum = 0;
    for (let i = 0; i < NBR_OF_DICES; i++) {
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      sum += randomNumber;
    }
    setNbrOfThrowsleft(nbrOfThrowsleft-1);
    setSum(sum);
  }

  const checkWinner = () => {
    if (sum >= WINNING_POINTS && nbrOfThrowsleft > 0) {
      setNbrOfWins(nbrOfWins+1);
      setStatus('You won');
    }
    else if (sum >= WINNING_POINTS && nbrOfThrowsleft === 0) {
      setNbrOfWins(nbrOfWins+1);
      setStatus('You won, game over');
    }
    else if (nbrOfWins > 0 && nbrOfThrowsleft === 0) {
      setNbrOfWins(nbrOfWins+1);
      setStatus('You won, game over');
    }
    else if (nbrOfThrowsleft === 0) {
      setStatus('Game over');
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  return(
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>Sum: {sum}</Text>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
        <Text style={styles.gameinfo}>Nbr of wins: {nbrOfWins}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button} onPress={() => throwDices()}>
          <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
    </View>
  )
}