import React from 'react';

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
    <Provider store={store}>
      <DotaGuideProvider>
        <AppNavigation />
      </DotaGuideProvider>
    </Provider>
  );
};

export default App;
