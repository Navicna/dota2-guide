import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DotaGuideProvider} from './src/context/DotaGuideContext';
import AppNavigation from './src/navigation';

import {Provider} from 'react-redux';
import reducer from './src/redux/index';
import {createStore} from 'redux';
import Reactotron from './src/config/ReactotronConfig';

export type AppState = ReturnType<typeof reducer>;

const store = createStore(reducer, Reactotron.createEnhancer());

const App = () => {
  return (
    <>
      <SafeAreaView style={{backgroundColor: Colors.darker}}>
        <StatusBar barStyle="light-content" />
      </SafeAreaView>
      <Provider store={store}>
        <DotaGuideProvider>
          <AppNavigation />
        </DotaGuideProvider>
      </Provider>
    </>
  );
};

export default App;
