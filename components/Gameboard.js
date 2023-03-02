import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native'
import materialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game'
import { Col, Grid, } from 'react-native-easy-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

let board = [];

export default Gameboard = ({ route }) => {

  const [playerName, setPlayerName] = useState('');
  const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [firstname, setFirstname] = useState('');

  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));

  const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

  const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

  const [selectedDicePoints, setSelectedDicePoints] = 
    useState(new Array(MAX_SPOT).fill(false));

    //
    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
      row.push(
        <Pressable 
            key={"row" + i}
            onPress={() => selectDice(i)}>
          <MaterialCommunityIcons
            name={board[i]}
            key={"row" + i}
            size={50} 
            color={getDiceColor(i)}>
          </MaterialCommunityIcons>
        </Pressable>
      );
    }
    //

  const pointsRow = [];

  for ( let spot = 0; spot < MAX_SPOT; spot++ ) {
    pointsRow.push(
      <Col key={"points" + spot}>
        <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
      </Col>
    )
  }

  const buttonRow = [];

  for ( let diceButton = 0; diceButton < MAX_SPOT; diceButton++ ) {
    buttonRow.push(
        <Col key={"buttonsRow" + diceButton}>
            <Pressable
            key={"buttonsRow" + diceButton}>
                <MaterialCommunityIcons
                name={"numeric-" + (diceButton + 1) + "-circle"}
                key={"buttonsRow" + diceButton}
                size={40}
                color={"steelblue"}
                ></MaterialCommunityIcons>
            </Pressable>
        </Col>
    )
  }

  useEffect(() => {
    
    checkWinner();
    if (nbrOfThrowsLeft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsLeft < 0) {
      setNbrOfThrowsLeft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsLeft]);

  function getDiceColor(i) {
    if (board.every((val, i, arr) => val === arr[0])) {
      return "orange";
    }
    else {
      return selectedDices[i] ? "black" : "steelblue";
    }
  }


  const getData = async () => {
    try {
      const firstname = await AsyncStorage.getItem('@firstname');
      console.log(firstname);
      if (firstname !== null) {
        setFirstname(firstname);
      }
    } catch(e) {
      // error reading value
    }
  }

  function selectDice(i) {
    let dices = [...selectedDices];
    dices[i] = selectedDices[i] ? false : true;
    setSelectedDices(dices);
  }

  function getSpotTotal(i) {
    return dicePointsTotal[i]
  }

  function selectDicePoints(i) {
    let selected = [...selectedDices];
    let selectedPoints = [...selectDicePoints]
    let points = [...dicePointsTotal]
    if (!selectedPoints(i)) {
      selectedPoints[i] = true;
      let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1: total), 0)
      points[i] = nbrOfDices * (i + 1)
      setDicePointsTotal(points)
    }
    selected.fill(false)
    setSelectedDices(selected)
    selectDicePoints(selectedPoints)
    setNbrOfThrowsLeft(NBR_OF_THROWS)
    return points[i]
  }

  function throwDices() {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if (!selectDice[i]) {
        let randomNumber = Math.floor(Math.random() * 6 + 1);
        board[i] = 'dice-' + randomNumber;
       // spots[i] = randomNumber;
      }
    }
    setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
    // setDiceSpots(spots)
    // setStatusBarBackgroundColor('Select and throw dices again')
  }

  function checkWinner() {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft > 0) {
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsLeft === 0) {
      setStatus('You won, game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsLeft === 0) {
      setStatus('Game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  


  return (
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
      <Text style={styles.gameinfo}>{status}</Text>
      <Pressable style={styles.button}
        onPress={() => throwDices()}>
          <Text style={styles.buttonText}>
            Throw dices
          </Text>
      </Pressable>
      <Text style={styles.gameinfo}>Total: {} </Text>
      <View style={styles.dicePoints}><Grid>{pointsRow}</Grid></View>
      <View style={styles.dicePoints}><Grid>{buttonRow}</Grid></View>
      <Text>Player: {firstname} </Text>
    </View>
  )
}