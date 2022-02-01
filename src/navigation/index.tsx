import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {HeroesListScreen} from '../screens/HeroesListScreen';
import {HeroDetailsScreen} from '../screens/HeroDetailsScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HeroList">
        <Stack.Screen name="HeroList" component={HeroesListScreen} />
        <Stack.Screen name="HeroDetails" component={HeroDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
