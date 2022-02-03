import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';

import {dispatchHeroAttributeFilter} from '../../redux/dota.actions';
import {fetchAttributesImage} from '../../services/heroes.services';

const heroAttributesInfo = ['str', 'agi', 'int'];

export function HeroAttributeFilter() {
  const [isActive, setIsActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [filterChoosed, setFilterChoosed] = useState('');
  const dispatch = useDispatch();
  function handleHeroAttributeFilter(attr: string, index: number) {
    if (activeIndex !== index) {
      setIsActive(true);
    } else {
      setIsActive(!isActive);
    }
    setActiveIndex(index);
    setFilterChoosed(attr);
    if (isActive && activeIndex === index) {
      dispatch(dispatchHeroAttributeFilter(''));
    } else {
      dispatch(dispatchHeroAttributeFilter(attr));
    }
  }

  function handleHeroAttributeOpacity(attr: string, index: number) {
    if (filterChoosed === attr && activeIndex === index && isActive) {
      return 1;
    }

    return 0.5;
  }

  return (
    <View style={styles.container}>
      {heroAttributesInfo.map((attr, index) => {
        return (
          <TouchableOpacity
            onPress={() => handleHeroAttributeFilter(attr, index)}>
            <Image
              source={{
                uri: fetchAttributesImage(attr),
              }}
              style={[
                styles.image,
                {opacity: handleHeroAttributeOpacity(attr, index)},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row'},
  image: {
    height: 30,
    width: 30,
  },
});
