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

export default function Recipe() {
  //Object to can obtain the params
  const route = useRoute();
  //Obtain the params we receive from the previous screen
  const { id } = route.params;

  const [foodID, setFoodID] = useState(JSON.stringify(id));

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
    <SafeAreaView>
      <Text>{foodID}</Text>
    </SafeAreaView>
  );
}
