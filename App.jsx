import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const colorPalette = {
  green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
  whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
  yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
  pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
};

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName='Welcome'>
//         <Stack.Screen name='Welcome'/>
//         <Stack.Screen name='Search'/>
//         <Stack.Screen name='Recipe'/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  const [ingredients, setIngredients] = useState(null);
  const [areas, setAreas] = useState(null);
  const [categories, setCategories] = useState(null);

  // For getting the data for filters on loading screen 
  useEffect(
    async () => {
      
        // try to get all data for searching 
        try {
          
          let response_ingredients = await fetch('www.themealdb.com/api/json/v1/1/list.php?i=list');
          setIngredients(response_ingredients.json());

          let response_areas = await fetch('www.themealdb.com/api/json/v1/1/list.php?a=list');
          setAreas(response_areas.json());

          let response_categories = await fetch('www.themealdb.com/api/json/v1/1/list.php?c=list');
          setCategories(response_categories.json());

        } catch (e) {
          setIngredients(null);
          setAreas(null);
          setCategories(null);
          console.log(e);
        }

    }
  , []);

  return (
    <View>
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
          <Text>{ingredients}</Text>
        </View>
        <View>
          <Text>Search by Geographical Area:</Text>
        </View>
        <View>
          <Text>Search by Category:</Text>
        </View>
      </View>
    </View>  
  );
}