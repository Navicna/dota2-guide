import Reactotron from 'reactotron-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({port: 9090})
  .useReactNative()
  .connect();

console.tron = tron;

export default tron;
