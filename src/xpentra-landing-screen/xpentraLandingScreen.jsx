import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export default function XpentraLandingScreen() {
  const navigation = useNavigation();

  const navigateToProductListScreen = () => {
    navigation.navigate('ProductListScreen');
  };

  return (
    <View style={styles.centeredView}>
      <Image
        source={{uri: 'https://www.q2pay.in/assets/landing/img/logo.png'}}
        style={styles.productImage}
      />
      <TouchableOpacity
        style={styles.buttonToViewProductList}
        onPress={navigateToProductListScreen}>
        <Text style={styles.buttonText}>Click to View Product List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#766bb6',
  },
  buttonToViewProductList: {
    width: 250,
    height: 50,
    backgroundColor: '#d0617f',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderBottomColor: '#A43E5A',
    borderBottomWidth: 1
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  productImage: {
    height: 60,
    width: 270,
    backgroundColor: 'white',
    marginBottom: 150,
  },
});
