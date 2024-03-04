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
                    mealIngredients.push({id: i, ingredient: ingredient });
                    mealAmounts.push({id: i, amount: amount });
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
        <ScrollView style={{ flex: 1 }}
  contentContainerStyle={{ flexGrow: 1 }}>
          <View style={RecipeStyles.containerRedo}>
            
          <View style={RecipeStyles.searchTitle}>
            <Text style={RecipeStyles.searchTitle} >{fullRecipe.strMeal}</Text>
            <Text style={RecipeStyles.searchSubTitle}>{fullRecipe.strCategory}</Text>
            <Text>{fullRecipe.dateModified}</Text>
            
          </View>
        
        <View style={RecipeStyles.containerDescrip}>
        <Image source={{uri: fullRecipe.strMealThumb}} style={RecipeStyles.mealImage} />
        <View style={RecipeStyles.containerDescrip}>
        <View style={{display: 'flex', flexDirection:'row', padding:20}}>
        <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Text style={RecipeStyles.textIngredients}>{item.ingredient}</Text>
        )}
        >

        </FlatList>
        <FlatList
        data={amounts}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <Text style={RecipeStyles.textAmount}>{item.amount}</Text>
        )}
        >
        </FlatList>
        </View>
        </View>
        <Text style={RecipeStyles.Instructions}>{fullRecipe.strInstructions}</Text>
        <TouchableOpacity style={RecipeStyles.buttonRecipe} onPress={() => {
          try {
            if (fullRecipe.strYoutube) {
              Linking.openURL(fullRecipe.strYoutube);
            } else {
              Alert.alert('Oh no! They have taken away the recipe video 😱');
            }
          } catch (error) {
            console.error('Error al abrir la URL:', error);
          }}}>
            <Text style={RecipeStyles.Instructions}>Watch on Youtube</Text>
            </TouchableOpacity>
        </View>        
        </View>
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
    height: '10%',
    padding: 20,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:
  {
    fontFamily: 'Inter-ExtraBold',
    color: colorPalette.whitelight,
    fontSize: 16,
  },
  logo:
  {
      height: 40,
      width: 40,
      marginRight: 10,
  },
  searchTitle: {
    fontSize: 35,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Inter-ExtraBold',
    marginVertical: 5,
    marginHorizontal: 10,
    color: colorPalette.green,
    
  },
  searchSubTitle: {
    fontSize: 12,
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
    paddingBottom: 5,
  },
  textIngredients:{
    fontFamily: 'Inter-Medium',
    textAlign: 'left'
  },
  textAmount:{
    fontFamily: 'Inter-Medium',
    textAlign: 'right'
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
    
  },

  recipes: {
    flex: 1,
    display: 'flex',
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
    height: 80,
    borderRadius: 10,
    top:-20,
  },
  buttonRecipe:{
    alignSelf: 'center',
    backgroundColor: colorPalette.yellow,
    width: '50%',
    height: 40,
    borderRadius: 10,
    margin:20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    
  },

  
});
