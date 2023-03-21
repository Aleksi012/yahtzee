import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import HomeScreen from "./components/Home";

const Tab = createBottomTabNavigator();

  export default function Navigation() {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={'Home'} component={HomeScreen} />
          <Tab.Screen name={'Gameboard'} component={Gameboard}  />
          <Tab.Screen name={'Scoreboard'} component={Scoreboard}  />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }