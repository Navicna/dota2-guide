import * as React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

import {HeroesListScreen} from '../screens/HeroesListScreen';
import {HeroDetailsScreen} from '../screens/HeroDetailsScreen';
import {SplashScreen} from '../screens/SplashScreen/SplashScreen';

import AnimatonsProjects from '../projects/index';

import {StatusBar} from 'react-native';

import {isReadyRef, navigationRef} from './NavigationService';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <>
      <SafeAreaView edges={['left', 'right', 'bottom']}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>

      <SafeAreaProvider>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            isReadyRef.current = true;
          }}>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="HeroList" component={HeroesListScreen} />
            <Stack.Screen name="HeroDetails" component={HeroDetailsScreen} />
            <Stack.Screen name="Projects" component={AnimatonsProjects} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </>
  );
}
