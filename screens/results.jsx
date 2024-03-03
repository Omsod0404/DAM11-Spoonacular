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
  const [req, setReq] = useState('No');

  //Object to can obtain the params
  const route = useRoute();

  useEffect(() => {
    const fetchData = async () => {

      try {

        const {data} = route.params;

          // "https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian"

        // let response_prueba = await fetch(JSON.stringify(request));
        // let data_prueba = await response_prueba.json();
        setPrueba(data);
        // setReq(JSON.stringify(request))
      } catch (error) {
        setPrueba(null);
        console.log(error);
      }
    };
    fetchData();
  }, [route.params]);

  const navigation = useNavigation();

  const navigateToRecipe = (idMeal) => {
    navigation.navigate('Recipe', {id: idMeal});
  };

  return (
    <SafeAreaView style={ResultStyles.container}>
      <View style = {ResultStyles.bar}>
      <Image source={require('../assets/icons/logo.png')} style={ResultStyles.logo}/>
      <Text style={ResultStyles.title}>Deli-Meals</Text>
    </View>
      <View style={ResultStyles.recipes}>
      {prueba && (
        <>
          <FlatList
            style = {ResultStyles.recipesList}
            data={prueba.meals}
            keyExtractor={(item) => item.idMeal}
            renderItem={({ item }) => (
              <>
                <View style = {ResultStyles.recipeContainer}>
                  <Image source={{uri: item.strMealThumb}} style={ResultStyles.mealImage}/>
                  <View style = {ResultStyles.recipeText}>
                    <Text style = {ResultStyles.recipeTitle}>{item.strMeal}</Text>
                    <TouchableOpacity style={ResultStyles.buttonRecipe} onPress={() => (navigateToRecipe(item.idMeal))}>
                      <Text style={ResultStyles.buttonRecipeText}>See full recipe</Text>
                      <Image source={require('../assets/icons/angle.png')} style={ResultStyles.next}/>
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

const ResultStyles = StyleSheet.create({
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
  container: {
    backgroundColor: colorPalette.whitelight,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 5,
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
    fontSize: 14,
    textAlign: 'center',
  },
  buttonRecipe:{
    backgroundColor: colorPalette.yellow,
    width: '90%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  buttonRecipeText:{
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colorPalette.white,
    marginLeft: 10,
  },
  next:{
    width: 12,
    height: 12,
    marginHorizontal: 10,
    tintColor: colorPalette.white,
    transform: [{
      rotate: '-90deg',
    }],
  },
});
