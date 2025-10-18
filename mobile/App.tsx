import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import { CartProvider } from './context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function App(){
  return (
    <CartProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Ночная Лавка' }} />
            <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Товар' }} />
            <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Корзина' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </CartProvider>
  );
}
