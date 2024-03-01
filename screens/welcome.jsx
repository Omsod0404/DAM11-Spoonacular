import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useFonts } from 'expo-font';

const colorPalette = {
    green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
    whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
    yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
    pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
  };

const WelcomeScreen = () => {
    //Object for can use Navigation
    const navigation = useNavigation();
    //Set a timeout to execute navigation to serach when the timer has reache 0 
    useEffect(() => {
        const timeout = setTimeout(navigateToSearch, 2000);
        return () => clearTimeout(timeout)//To execute the timer
    }, []);
    //Function to navigate to search
    const navigateToSearch = () => {
        navigation.navigate('Search')
    };
    //Fonts used on this screen
    const [fontsLoaded] = useFonts({
        'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf')
    });

    return(
        <SafeAreaView style={welcomeScreenStyles.container}>
            {/* Logo */}
            <Image source={require('../assets/icons/logo.png')} style={welcomeScreenStyles.logo}/>
            <Text style={welcomeScreenStyles.title}>Deli-Meals</Text>
        </SafeAreaView>
    );
};

const welcomeScreenStyles = StyleSheet.create({
    container: {
        backgroundColor: colorPalette.green,
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontFamily: 'Inter-ExtraBold',
        color: colorPalette.whitelight,
        fontSize: 40,
    },
    logo:{
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    }
});

export default WelcomeScreen;