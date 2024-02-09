import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import XpentraLandingScreen from '../xpentra-landing-screen/xpentraLandingScreen';
import ProductListScreen from '../product-list-screen/productListScreen';
import ProductDetailsScreen from '../product-details-screen/productDetailsScreen';

const Stack = createStackNavigator();

export default function NavigationFile() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="XpentraLandingScreen" >
        <Stack.Screen name="XpentraLandingScreen" component={XpentraLandingScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="ProductListScreen" component={ProductListScreen}  options={{ headerShown: false }}  />
        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}  options={{ headerShown: false }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

;
