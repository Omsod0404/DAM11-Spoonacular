import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//To import the screens as components
import { Recipe, Results, Search, Welcome } from './screens/index.jsx';

//For create a screens stack
const Stack = createNativeStackNavigator();

const colorPalette = {
  green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
  whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
  yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
  pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
};

export default function App() {
  return (
    /* A navigator container is like a view where you can navigate throught screen */
    <NavigationContainer>
      {/* Status bar of the app */}
      <StatusBar barStyle={'light-content'} backgroundColor={colorPalette.green}/>
      <Stack.Navigator initialRouteName='Search'>
        <Stack.Screen name='Welcome' component={Welcome} options={{headerShown: false}}/>
        <Stack.Screen name='Search' component={Search} options={{headerShown: false}}/>
        <Stack.Screen name='Recipe' component={Recipe} options={{headerShown: false}}/>
        <Stack.Screen name='Results' component={Results} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}