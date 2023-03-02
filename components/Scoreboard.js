import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native'
import materialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, BONUS_POINTS, BONUS_POINTS_LIMIT } from '../constants/Game'
import { Col, Grid, } from 'react-native-easy-grid';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { setStatusBarBackgroundColor } from 'expo-status-bar';

export default Gameboard = ({ route }) => {

  return (
    <View style={styles.header}>
      <Text style={styles.title}>
        Scoreboard
      </Text>
    </View>
  )
}