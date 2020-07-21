import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from './components/HomeScreen';
import ProductScreen from './components/ProductScreen';
import UpdateItem from './components/UpdateItem';
import DeleteItem from './components/DeleteItem';

const Stack = createStackNavigator();

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{gestureEnabled: false}}>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{title: 'Welcome to Jalsa Cafe!'}}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{title: 'Menu'}}
          />
          <Stack.Screen
            name="UpdateItem"
            component={UpdateItem}
            options={{title: 'Add Product'}}
          />
          <Stack.Screen
            name="DeleteItem"
            component={DeleteItem}
            options={{title: 'Delete Product'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
