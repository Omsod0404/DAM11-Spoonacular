import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation, useRoute } from "@react-navigation/native";

const colorPalette = {
  green: "rgba(0, 66, 37, 1)" /*Hex  #004225*/,
  whitelight: "rgba(245, 245, 220, 1)" /*Hex  #F5F5DC*/,
  yellow: "rgba(255, 176, 0, 1)" /*Hex  #FFB000*/,
  pinklight: "rgba(255, 207, 157, 1)" /*Hex  #FFCF9D*/,
  white: "rgba(255, 255, 255, 1)" /*Hex  #FFFFFF*/,
};

export default function Results() {
  //Fonts used on this screen
  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const [prueba, setPrueba] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Define an async function

      try {
        let response_prueba = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"
        );
        let data_prueba = await response_prueba.json();
        setPrueba(data_prueba);
      } catch (error) {
        setPrueba(null);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const navigation = useNavigation();

  const navigateToRecipe = (idMeal) => {
    navigation.navigate('Recipe', {id: idMeal});
  };

  return (
    <SafeAreaView style={SearchStyles.container}>
      <View style={SearchStyles.recipes}>
      {prueba && (
        <>
          <FlatList
            style = {SearchStyles.recipesList}
            data={prueba.meals}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <>
                <View style = {SearchStyles.recipeContainer}>
                  <Image source={{uri: item.strMealThumb}} style={SearchStyles.mealImage}/>
                  <View style = {SearchStyles.recipeText}>
                    <Text style = {SearchStyles.recipeTitle}>{item.strMeal}</Text>
                    <TouchableOpacity style={SearchStyles.buttonRecipe} onPress={() => (navigateToRecipe(item.idMeal))}>
                      <Text style={SearchStyles.buttonRecipeText}>See full recipe</Text>
                      <Image source={require('../assets/icons/next.png')} style={SearchStyles.next}/>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
          >
          </FlatList>
        </>
      )}
    </View>
    </SafeAreaView>
  );
}

const SearchStyles = StyleSheet.create({
  container: {
    backgroundColor: colorPalette.whitelight,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  filters: {
    backgroundColor: colorPalette.green,
    height: 200, 
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  recipes: {
    flex: 1,
    display: 'flex',
  },
  recipesList:{
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 5,
  },
  recipeContainer:{
    backgroundColor: colorPalette.white,
    height: 120,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  mealImage:{
    width: '40%',
    height: '90%',
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 10,
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
    fontSize: 20,
    textAlign: 'center',
  },
  buttonRecipe:{
    backgroundColor: colorPalette.yellow,
    width: '80%',
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonRecipeText:{
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colorPalette.white,
  },
  next:{
    width: 30,
    height: 30,
  },
});
