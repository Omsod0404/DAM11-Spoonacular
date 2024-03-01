import React, {useState, useEffect} from "react";
import { Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";

export default function Search ()
{
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
    <View>
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
                    style={{ height: 300, width: 300 }}
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
                    style={{ height: 300, width: 300 }}
                  />
                </View>
              }
            </>
          }
        </View>
      </View>
    </View>  
  );
};

