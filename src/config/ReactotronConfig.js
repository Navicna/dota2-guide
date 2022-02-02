import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {reactotronRedux} from 'reactotron-redux';

const reactotron = Reactotron;

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({port: 9090})
  .use(reactotronRedux())
  .useReactNative()
  .connect();

console.tron = tron;

export default reactotron;
