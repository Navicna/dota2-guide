import React, {useEffect} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ImageBox, ViewBox} from '../../ui';
import {Images} from '../../assets/image';
import {screenProportion} from '../../utils/Metrics';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {LottieAnimations} from '../../assets/lottie';
export function SplashScreen() {
  const {navigate} = useNavigation();
  function handleSplashTimeOut() {
    setTimeout(() => {
      navigate('HeroList');
    }, 3000);
  }

  useEffect(() => {
    handleSplashTimeOut();
  }, []);
  return (
    <ViewBox bgColor={Colors.darker} flex={1} height={300} alignItems="center">
      <ImageBox
        source={Images.dota2}
        height={screenProportion('HEIGHT', 0.4)}
        width={screenProportion('FULL_WIDTH')}
        mt={screenProportion('HEIGHT', 0.2)}
        resizeMode="contain"
      />
      <LottieView
        source={LottieAnimations.loading}
        style={{width: 224, height: 120}}
        autoPlay
      />
    </ViewBox>
  );
}
