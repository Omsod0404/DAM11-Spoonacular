import React, {useState, useEffect} from "react";
import { Text, View, FlatList, Image, StyleSheet, TextInput} from "react-native";

export default function Search ()
{
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

        setFilters(true) // if success then display based on this hook
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
};

