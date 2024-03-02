import React, {useState, useEffect} from "react";
import { Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import { useFonts } from 'expo-font';

const colorPalette = {
  green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
  whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
  yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
  pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
};

export default function Search ()
{

  const [fontsBold] = useFonts({
    'Inter-ExtraBold': require('../assets/fonts/Inter-ExtraBold.ttf')
  });

  const [areas, setAreas] = useState(null);
  const [categories, setCategories] = useState(null);
  const [imActive, setImActive] = useState([false, false, false]);
  const [inputTxt, setInputTxt] = useState('Search');
  const [recipes, setRecipes] = useState(null);

  const [error, setError] = useState(null); 

  // For getting the data for filters on loading screen (Only once)
  useEffect(() => {

    const fetchData = async () => { // Define an async function
      
      try {
        let response_areas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
        let data_areas = await response_areas.json();
        setAreas(data_areas);
  
        let response_categories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        let data_categories = await response_categories.json();
        setCategories(data_categories);

      } catch (error) {
        setAreas(null);
        setCategories(null);

        console.log(error);
      }

    };
  
    fetchData(); 
  }, []);

  const  display = (index) => {
    let states = Array(imActive.length).fill(false)
    states[index] = !imActive[index];
    setImActive(states);
  };

  return (
  <SafeAreaView>  

    <View style = {styles.bar}>
      <Image source={require('../assets/icons/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Deli-Meals</Text>
    </View>

    <View style = {styles.mainContainer}>

      <View>
        <Text style = {styles.heading}>What you wanna cook?</Text>

        <Text style = {styles.accordionTxt}>Search by:</Text>
        <View>
          <Text>Name:</Text>
          <TextInput
            multiline = {false}
            maxLength={40}
            onChangeText={text => setInputTxt(text)}
            value={inputTxt}/>
        </View>
        
        <View>
          <View>
            <TouchableOpacity 
              onPress={() => display(0)}>
              <Text>Ingredient:</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {areas && 
          <View style = {styles.accordion}>
            <View>
              <TouchableOpacity 
                style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',}}
                onPress={() => display(1)}>
                <Text style = {styles.accordionTxt}>Geographical Area:</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[1] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(areas && imActive[1]) &&
              <View style = {styles.flatListContainer}>
                <FlatList
                  data={areas.meals}
                  contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                  persistentScrollbar = {true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style = {styles.btnAccordion} value = {item.strArea}>
                      <Text style = {styles.btnAccordionTxt}>{item.strArea}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            }
          </View>
        }
        
        {categories && 
          <View style = {styles.accordion}>
            <View>
              <TouchableOpacity 
                style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',}}
                onPress={() => display(2)}>
                <Text style = {styles.accordionTxt}>Category:</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[2] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(categories && imActive[2]) &&
              <View style = {styles.flatListContainer}>
                <FlatList
                  data={categories.meals}
                  contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                  persistentScrollbar = {true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style = {styles.btnAccordion} value = {item.strCategory}>
                      <Text style = {styles.btnAccordionTxt}>{item.strCategory}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            }
          </View>
        }
      </View>

      <View>
        <View style = {{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: '60%'}}>
            <Image style={{height: 100, width: 100, alignSelf: 'center'}} source={require('../assets/icons/Baguette.gif')}/>
            <Image style={{height: 100, width: 100, alignSelf: 'center'}} source={require('../assets/icons/Bread.gif')}/>
            <Image style={{height: 100, width: 100, alignSelf: 'center'}} source={require('../assets/icons/Generique.gif')}/>
        </View>
      </View>

    </View>
  </SafeAreaView>  
  );
};

const styles = StyleSheet.create(
  {
    mainContainer:
    {
      backgroundColor: colorPalette.whitelight,
      width: '100%',
      height: '100%',
      padding: 20,
      // justifyContent: 'space-between'
    },
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
      fontSize: 30,
    },
    logo:
    {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    accordion:
    {
      borderWidth: 2,
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 10,
      marginVertical: 10,
      borderColor: colorPalette.green,
    },
    accordionTxt:
    {
      fontSize: 14,
      fontWeight: 'bold',
      color: colorPalette.green,
    },
    flatListContainer:
    {
      paddingVertical: 10,
      height: 300,
    },
    btnAccordion:
    {
      backgroundColor: colorPalette.yellow,
      height: 55,
      margin: 5,
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
    btnAccordionTxt:
    {
      color: colorPalette.whitelight,
      fontSize: 14,
      fontWeight: 'bold',
    },
    angleAccordion:
    {
      height: 20, 
      width: 20, 
      marginTop: 5,
      tintColor: colorPalette.green,
    },
    heading:
    {
      fontSize: 20,
      fontWeight: 'bold',
      color: colorPalette.green,
    },
  }
);
