import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DotaGuideProvider} from './src/context/DotaGuideContext';
import AppNavigation from './src/navigation';

const App = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.darker}}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <DotaGuideProvider>
        <AppNavigation />
      </DotaGuideProvider>
    </>
  );
};

export default App;
