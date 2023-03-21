import React, { useState } from 'react';
import { Text, View, TextInput, Pressable, Keyboard, ScrollView } from 'react-native';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, MIN_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS } from '../constants/Game';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../style/style';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import Footer from './Footer';


export default Home = ({  }) => {

    const Navigation = useNavigation();
    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return (
        <View style={styles.container}>
          <Header/>
            {!hasPlayerName
                ?
                <>
                    <MaterialCommunityIcons
                        name="information"
                        size={80}
                        style={styles.user}
                        color="#9370DB"
                    />
                    <Text style={styles.rulesheader}>Enter your name for the scoreboard:</Text>
                    <TextInput style={styles.textinput} onChangeText={setPlayerName} autoFocus={true}></TextInput>
                    <Pressable style={styles.playbutton} onPress={() => handlePlayerName(playerName)}>
                        <Text style={styles.buttonText}>OK</Text>
                    </Pressable>
                </>
                :
                <>
                    <ScrollView>
                    <MaterialCommunityIcons         
                        name="information"
                        size={100}
                        color="#9370DB"
                        style={styles.info}
                    />
                    <Text style={styles.rulesheader}>Rules of the game</Text>
                    <Text style={styles.rules}><Text style={styles.rule}>THE GAME:</Text> Upper section of the classic Yahtzee
                        dice game. You have {NBR_OF_DICES} dices and
                        for the every dice you have {NBR_OF_THROWS} throws. After each throw you can keep dices in
                        order to get same dice spot counts as many as
                        possible. In the end of the turn you must select
                        your points from {MIN_SPOT} to {MAX_SPOT}.
                        Game ends when all points have been selected.
                        The order for selecting those is free. </Text>
                        <Text style={styles.rules}><Text style={styles.rule}>POINTS:</Text> After each turn game calculates the sum
                        for the dices you selected. Only the dices having
                        the same spot count are calculated. Inside the
                        game you can not select same points from {MIN_SPOT} to {MAX_SPOT} again.</Text>
                        <Text style={styles.rules}><Text style={styles.rule}>GOAL:</Text> To get points as much as possible. {BONUS_POINTS_LIMIT} points is the limit of
                        getting bonus which gives you {BONUS_POINTS} points more.</Text>
                    <Text style={styles.lucktext}>Good luck, {playerName}!</Text>
                    <Pressable style={styles.playbutton}
                        onPress={() => Navigation.navigate(('Gameboard'),{player:playerName})}>
                        <Text style={styles.buttonText}>PLAY</Text>
                    </Pressable>
                    </ScrollView>
                </>
            }
            <Footer/>
        </View>
    )
}
