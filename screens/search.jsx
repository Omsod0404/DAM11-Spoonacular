import React, {useState, useEffect} from "react";
import { Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView} from "react-native";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";

const colorPalette = {
  green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
  whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
  yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
  pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
  white: 'rgba(255, 255, 255, 1)', /*Hex  #FFFFFF*/
};

export default function Search ()
{
  //Fonts used on this screen
  const [fontsLoaded] = useFonts({
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf'),
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Light': require('../assets/fonts/Inter-Light.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
  });

  const [ingredients, setIngredients] = useState(null);
  const [areas, setAreas] = useState(null);
  const [categories, setCategories] = useState(null);
  const [imActive, setImActive] = useState([false, false]);

  // For getting the data for filters on loading screen (Only once)
  useEffect(() => {

    const fetchData = async () => { // Define an async function
      
      try {
        let response_ingredients = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
        let data_ingredients = await response_ingredients.json();
        setIngredients(data_ingredients);
  
        let response_areas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        let data_areas = await response_areas.json();
        setAreas(data_areas);
  
        let response_categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        let data_categories = await response_categories.json();
        setCategories(data_categories);

      } catch (error) {
        setIngredients(null);
        setAreas(null);
        setCategories(null);

        console.log(error);
      }

    };
  
    fetchData(); 
  }, []);

  const  display = (state, index) => {
    states = [false, false];
    states[index] = !state;
    setImActive(states);
  };

  return (
    <SafeAreaView style={SearchStyles.container}>
    <View style={SearchStyles.filters}>
      <Text>{ingredients && areas? 'S': 'N'}</Text>
      
      <View><Text>Bar</Text></View>
      <View>
        <Text>What you wanna it?</Text>
        <View>
          <TextInput
            multiline = {false}
            maxLength={40}/>
        </View>
        <View>
          <Text>Search by Ingredient:</Text>
          <TextInput
            multiline = {false}
            maxLength={40}/>
        </View>
        
        <View>
          {areas && 
            <>
              <View>
                <TouchableOpacity 
                  onPress={() => display(imActive[0], 0)}>
                  <Text>Search by Geographical Area:</Text>
                </TouchableOpacity>
              </View>
              {(areas && imActive[0]) &&
                <View>
                  <FlatList
                    data={areas.meals}
                    persistentScrollbar = {true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity>
                        <Text>{item.strArea}</Text>
                      </TouchableOpacity>
                    )}
                    style={{ height: 100, width: 300 }}
                  />
                </View>
              }
            </>
          }
        </View>
        
        <View>
          {categories && 
            <>
              <View>
                <TouchableOpacity
                  onPress={() => display(imActive[1], 1)}>
                  <Text>Search by Category:</Text>
                </TouchableOpacity>
              </View>
              {(categories && imActive[1]) && 
                <View>
                  <FlatList
                    data={categories.meals}
                    persistentScrollbar = {true}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity>
                        <Text>{item.strCategory}</Text>
                      </TouchableOpacity>
                    )}
                    style={{ height: 100, width: 300 }}
                  />
                </View>
              }
            </>
          }
        </View>
      </View>
    </View>
    </SafeAreaView>
  );
};
