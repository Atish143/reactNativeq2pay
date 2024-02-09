import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import NavigationFile from "./src/navigations/navigationFile"
import 'react-native-gesture-handler';

function App(){
  return (
    <View style={{flex: 1}}>
      <NavigationFile />
    </View>
  )
}

export default App