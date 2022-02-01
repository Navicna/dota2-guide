import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DotaGuideProvider} from './src/context/DotaGuideContext';
import {HeroesListScreen} from './src/screens/HeroesListScreen';

const App = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.darker}}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <DotaGuideProvider>
        <HeroesListScreen />
      </DotaGuideProvider>
    </>
  );
};

export default App;
