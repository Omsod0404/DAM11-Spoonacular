import React, { useState, useEffect } from "react";
import {Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert, ScrollView,} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Linking } from 'react-native';

const colorPalette = {
  green: "rgba(0, 66, 37, 1)" /*Hex  #004225*/,
  whitelight: "rgba(245, 245, 220, 1)" /*Hex  #F5F5DC*/,
  yellow: "rgba(255, 176, 0, 1)" /*Hex  #FFB000*/,
  pinklight: "rgba(255, 207, 157, 1)" /*Hex  #FFCF9D*/,
  white: "rgba(255, 255, 255, 1)" /*Hex  #FFFFFF*/,
};

export default function Recipe() {  

  const[error,setError]=useState(null);
  const[fullRecipe, setFullRecipe]=useState();
  const[ingredients,setIngredients]=useState([]);
  const[amounts,setAmounts]=useState([]);

  //Object to can obtain the params
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Obtain the params we receive from the previous screen
        const {id} = route.params;

        let response_fullRecipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data_FullRecipe = await response_fullRecipe.json();
        if (data_FullRecipe.meals[0]) {
            setFullRecipe(data_FullRecipe.meals[0]);  
        
            let mealIngredients = [];
            let mealAmounts = [];
            for (let i = 1; i <= 20; i++) {
                const ingredient = data_FullRecipe.meals[0][`strIngredient${i}`];
                const amount = data_FullRecipe.meals[0][`strMeasure${i}`];
                if (ingredient) {
                    mealIngredients.push({ingredient: ingredient });
                    mealAmounts.push({amount: amount });
                }
            }
            setAmounts(mealAmounts);
            setIngredients(mealIngredients);
        }
      }
      catch (error) {
        setFullRecipe(null);
        setIngredients([]);
        setAmounts([]);
        setError('Error getting the recipe, please try again later.');
      }
    };
    fetchData(); 
}, [route.params]);

  //Fonts used on this screen
  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });
  return (
    <SafeAreaView style = {RecipeStyles.container}>
      <View style = {RecipeStyles.bar}>
        <Image source={require('../assets/icons/logo.png')} style={RecipeStyles.logo}/>
        <Text style={RecipeStyles.title}>Deli-Meals</Text>
      </View>
      
      <View style={RecipeStyles.recipes}>
      {fullRecipe && (
        <>
          <ScrollView style={RecipeStyles.recipeScroll} contentContainerStyle={{ flexGrow: 1 }}>

            <Text style={RecipeStyles.mealTitle} >{fullRecipe.strMeal}</Text>
            <Text style={RecipeStyles.mealCategory}>{fullRecipe.strArea} - {fullRecipe.strCategory}</Text>
            
            <Image source={{uri: fullRecipe.strMealThumb}} style={RecipeStyles.mealImage} />
            
            <View style={{display: 'flex', flexDirection:'row', padding:20, justifyContent:'space-between'}}>
              <Text style={RecipeStyles.searchSubTitle2}>Ingredients</Text>
              <Text style={RecipeStyles.searchSubTitle2}>Measure</Text>
            </View>

            <View style={{ display: 'flex', flexDirection: 'column', paddingHorizontal: 20 }}>
            {
              ingredients.map((ingredient, index) => (
                <View key={index} style={{ marginRight: 20, display: "flex", flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                  <Text style={RecipeStyles.textIngredients}>{ingredient.ingredient}</Text>
                  <Text style={RecipeStyles.textAmount}>{amounts[index].amount}</Text>
                </View>
              ))
            }
            </View>

            <Text style={RecipeStyles.searchSubTitle3}>How to make it?</Text>
            <Text style={RecipeStyles.Instructions}>{fullRecipe.strInstructions}</Text>

            <TouchableOpacity style={RecipeStyles.buttonRecipe} onPress={() => {
              try {
                if (fullRecipe.strYoutube) {
                  Linking.openURL(fullRecipe.strYoutube);
                } else {
                  Alert.alert('YouTube video not aviable currently, try later');
                }
              } catch (error) {
                console.error('Error al abrir la URL:', error);
              }}}>
                <Text style={RecipeStyles.textInstructionsB}>Watch on Youtube</Text>
            </TouchableOpacity>       
          </ScrollView>
        </>
      )}
      {error && (
        Alert.alert(error),
        navigation.goBack('Results')
      )}
      </View>
    </SafeAreaView>
  );
}

const RecipeStyles = StyleSheet.create({
  bar: 
  {
    backgroundColor: colorPalette.green,
    width: '100%',
    height: 80,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:
  {
    fontFamily: 'Inter-ExtraBold',
    color: colorPalette.whitelight,
    fontSize: 24,
  },
  logo:
  {
    height: 50,
    width: 50,
    marginRight: 10,
  },
  recipeScroll: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: colorPalette.white,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius:20,
  },
  mealTitle: {
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    color: colorPalette.green,
    width: '90%',
    margin: 20
  },
  mealCategory: {
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    color: colorPalette.green,
    width: '90%',
    top: -20,
  },
  searchSubTitle: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    marginVertical: 5,
    marginHorizontal: 10,
    color: colorPalette.green,
    top:-15,
  },
  container: {
    backgroundColor: colorPalette.whitelight,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    borderRadius:10,
  },
  textIngredients:{
    fontFamily: 'Inter-Medium',
    textAlign: 'left'
  },
  textAmount:{
    fontFamily: 'Inter-Medium',
    textAlign: 'right'
  },
  searchSubTitle2: {
    fontSize: 18,
    fontFamily: 'Inter-ExtraBold',
    color: colorPalette.green,
  },
  searchSubTitle3: {
    fontSize: 18,
    fontFamily: 'Inter-ExtraBold',
    textAlign: 'center',
    color: colorPalette.green,
    width: '100%',
    marginVertical: 20,
  },

  containerRedo: {
    backgroundColor: colorPalette.white,
    flex: 1,
    alignSelf:'center',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 5,
    top: 15,
    bottom:5,
    width:360,
    borderRadius:10,
  },

  containerDescrip:{
    alignSelf:'center',
    flexDirection: 'column',
    paddingBottom: 5,
    top:-15,
    width:310,
    borderRadius:10,
  },

  recipes: {
    flex: 1,
    display: 'flex',
    paddingVertical: 20,
  },
  recipeContainer:{
    top:150,
    backgroundColor: colorPalette.white,
    height: 150,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  Instructions:{
    textAlign:'justify',
    fontFamily: 'Inter-Medium',
    width: '90%',
    alignSelf: 'center',
  },
  textInstructionsB:{
    textAlign:'center',
    fontFamily: 'Inter-Medium',
    width: '90%',
    alignSelf: 'center',
  },
  recipeText:{
    width: '50%',
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: 10,
  },
  recipeTitle:{
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    textAlign: 'center',
  },
  mealImage:{
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  buttonRecipe:{
    alignSelf: 'center',
    backgroundColor: colorPalette.yellow,
    width: '80%',
    height: 40,
    borderRadius: 10,
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    
  },

  
});
