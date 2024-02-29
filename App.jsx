import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const colorPalette = {
  green : 'rgba(0, 66, 37, 1)', /*Hex  #004225*/ 
  whitelight: 'rgba(245, 245, 220, 1)', /*Hex  #F5F5DC*/
  yellow: 'rgba(255, 176, 0, 1)', /*Hex  #FFB000*/
  pinklight: 'rgba(255, 207, 157, 1)', /*Hex  #FFCF9D*/
};

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
