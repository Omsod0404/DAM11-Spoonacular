import React, {useState, useEffect} from "react";
import { Text, View, FlatList, Image, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import { useFonts } from 'expo-font';
import { useNavigation } from "@react-navigation/native";
import validator from "validator";

const colorPalette = {
  green: "rgba(0, 66, 37, 1)" /*Hex  #004225*/,
  whitelight: "rgba(245, 245, 220, 1)" /*Hex  #F5F5DC*/,
  yellow: "rgba(255, 176, 0, 1)" /*Hex  #FFB000*/,
  pinklight: "rgba(255, 207, 157, 1)" /*Hex  #FFCF9D*/,
  white: "rgba(255, 255, 255, 1)" /*Hex  #FFFFFF*/,
};

export default function Search ()
{

  const [fontsLoaded] = useFonts({
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Light": require("../assets/fonts/Inter-Light.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.ttf"),
  });

  const [areas, setAreas] = useState(null);
  const [categories, setCategories] = useState(null);
  const [imActive, setImActive] = useState([false, false, false, false]);
  const [inputTxt, setInputTxt] = useState('');
  const [request, setRequest] = useState(null);

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
        setInputTxt('');
        setRequest(null);
        setError('Error getting the categories and area');
        console.log(error);
      }

    };
  
    fetchData(); 
  }, []);

  const  display = (index) => {
    let states = Array(imActive.length).fill(false)
    states[index] = !imActive[index];
    setImActive(states);
    setInputTxt('');
    setRequest(null);
  };

  const cleanStr = (str) => {
    if(str!=null){
      return str.replace(/ /g, '_');
    }
    return ''
  };

  const isValidInput = (type) => {

    let cleanInputTxt = cleanStr(inputTxt)

    if (validator.isWhitelisted(cleanInputTxt, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_')) {
      setInputTxt(cleanInputTxt);
      navigateToResults(type, cleanInputTxt);
    } else {
      Alert.alert('Sorry!', 'The text must contain only english letters and spaces.');
    }
  };

  const navigation = useNavigation();


  const navigateToResults = async (type, value) => {
    let url;
    
    switch (type) {
      case 0:
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(value)}`;
        break;
  
      case 1:
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(value)}`;
        break;
  
      case 2:
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(value)}`;
        break;
  
      case 3:
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(value)}`;
        break;
  
      default:
        url = 'https://www.themealdb.com/api/json/v1/1/random.php';
        break;
    }
  
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      let data = await response.json();
      
      if (data.meals != null){
        navigation.navigate('Results', { data });
      } else {
        Alert.alert('Sorry!', 'We coudn\'t find something 😵‍💫');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Not your fault!', 'There was an error getting the data 😓');
    }
  };
  

  return (
  <SafeAreaView>  

    <View style = {styles.bar}>
      <Image source={require('../assets/icons/logo.png')} style={styles.logo}/>
      <Text style={styles.title}>Deli-Meals</Text>
    </View>

    <View style = {styles.mainContainer}>

      <View>
        <Text style = {styles.heading}>Wanna cook?</Text>

        <Text style = {[styles.accordionTxt, {marginVertical: 15,}]}>Search by:</Text>
        
        <View style = {styles.accordion}>
            <View>
              <TouchableOpacity 
                style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',}}
                onPress={() => display(0)}>
                <Text style = {styles.accordionTxt}>Food Name</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[0] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(areas && imActive[0]) &&
              <View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', margin: 10,}}>
                <TextInput
                  style = {styles.inputStyle}
                  multiline = {false}
                  maxLength={40}
                  placeholder="Write here"
                  onChangeText={input => setInputTxt(input)}
                  value={inputTxt}/>
                <TouchableOpacity style = {styles.btnInput} 
                  onPress={() => isValidInput(0)}>
                  <Text style = {styles.btnInputTxt}>Search</Text>
                  <Image source={require('../assets/icons/angle.png')} style = {{transform: [{rotate: '-90deg'}], height: 14, width: 14, tintColor: colorPalette.white,}}/>
                </TouchableOpacity>
              </View>
            }
          </View>
        
          <View style = {styles.accordion}>
            <View>
              <TouchableOpacity 
                style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',}}
                onPress={() => display(1)}>
                <Text style = {styles.accordionTxt}>Ingredient Name</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[1] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(areas && imActive[1]) &&
              <View style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', margin: 10,}}>
                <TextInput
                  style = {styles.inputStyle}
                  multiline = {false}
                  maxLength={40}
                  placeholder="Write here"
                  onChangeText={input => setInputTxt(input)}
                  value={inputTxt}/>
                <TouchableOpacity style = {styles.btnInput}
                  onPress={() => isValidInput(1)}>
                  <Text style = {styles.btnInputTxt}>Search</Text>
                  <Image source={require('../assets/icons/angle.png')} style = {{transform: [{rotate: '-90deg'}], height: 14, width: 14, tintColor: colorPalette.white,}}/>
                </TouchableOpacity>
              </View>
            }
          </View>
        
        
        {areas && 
          <View style = {styles.accordion}>
            <View>
              <TouchableOpacity 
                style = {{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between',}}
                onPress={() => display(2)}>
                <Text style = {styles.accordionTxt}>Geographical Area</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[2] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(areas && imActive[2]) &&
              <View style = {styles.flatListContainer}>
                <FlatList
                  data={areas.meals}
                  contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                  persistentScrollbar = {true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style = {styles.btnAccordion} 
                      value = {item.strArea}
                      onPress={() => navigateToResults(2, item.strArea)}>
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
                onPress={() => display(3)}>
                <Text style = {styles.accordionTxt}>Category</Text>
                <Image source={require('../assets/icons/angle.png')} style = {[styles.angleAccordion, {transform: [{rotate: !imActive[3] ? '0deg' : '180deg'}],}]}/>
              </TouchableOpacity>
            </View>
            {(categories && imActive[3]) &&
              <View style = {styles.flatListContainer}>
                <FlatList
                  data={categories.meals}
                  contentContainerStyle={{flexDirection : "row", flexWrap : "wrap"}}
                  persistentScrollbar = {true}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity style = {styles.btnAccordion} 
                      value = {item.strCategory}
                      onPress={() => navigateToResults(3, item.strCategory)}>
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
        <View style = {{width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', }}>
            <Image style={{height: 140, width: 140, alignSelf: 'center'}} source={require('../assets/icons/Generique.gif')}/>
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
      fontSize: 16,
    },
    logo:
    {
        height: 40,
        width: 40,
        marginRight: 10,
    },
    accordion:
    {
      paddingHorizontal: 10,
      paddingVertical: 20,
      borderRadius: 10,
      marginVertical: 10,
      backgroundColor: colorPalette.white,
    },
    accordionTxt:
    {
      fontSize: 18,
      fontFamily: 'Inter-Bold',
      color: 'black',
      marginLeft: 10,
    },
    flatListContainer:
    {
      paddingVertical: 10,
      height: 180,
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
      color: colorPalette.white,
      fontSize: 14,
      fontFamily: 'Inter-Medium',
    },
    angleAccordion:
    {
      height: 25, 
      width: 25, 
      marginTop: 5,
      marginRight: 10,
      tintColor: 'black',
    },
    heading:
    {
      fontSize: 36,
      fontFamily: 'Inter-Bold',
      color: colorPalette.green,
    },
    btnInput:
    {
      backgroundColor: colorPalette.yellow,
      color: colorPalette.white,
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      flexDirection: 'row', 
      flexWrap: 'wrap', 
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      borderRadius: 10,
    },
    btnInputTxt:
    {
      color: colorPalette.white,
      fontFamily: 'Inter-Medium',
      marginRight: 10,
    },
    inputStyle:
    {
      borderBottomWidth: 2,
      flex: 1,
      marginRight: 10,
      fontFamily: 'Inter-Light',
      borderColor: 'grey',
      borderRadius: 1,
      fontSize: 14,
    },
  }
);
