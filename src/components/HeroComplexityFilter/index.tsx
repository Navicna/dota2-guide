import React from 'react';
import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchHeroComplexityFilter} from '../../redux/dota.actions';

export function HeroComplexityFilter() {
  const dispatch = useDispatch();
  const [complexityFilter, setComplexityFilter] = useState(-1);
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  function handleComplexityBgColor(index: number) {
    if (!isActiveFilter) {
      return 'transparent';
    }
    if (complexityFilter === index || complexityFilter > index) {
      return 'white';
    }
    return 'transparent';
  }

  function handleComplexityHeroFilter(index: number) {
    if (complexityFilter === index) {
      if (!isActiveFilter) {
        dispatch(dispatchHeroComplexityFilter(index + 1));
        setIsActiveFilter(true);
        return;
      }
      dispatch(dispatchHeroComplexityFilter(0));
      setIsActiveFilter(!isActiveFilter);
      return;
    }
    dispatch(dispatchHeroComplexityFilter(index + 1));
    setComplexityFilter(index);
    setIsActiveFilter(true);
  }

  return (
    <View style={styles.heroComplexityContainer}>
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <TouchableOpacity onPress={() => handleComplexityHeroFilter(i)}>
            <View
              style={[
                styles.rhomb,
                {backgroundColor: handleComplexityBgColor(i)},
              ]}
              key={i}
            />
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  heroComplexityContainer: {flexDirection: 'row'},
  rhomb: {
    marginRight: 12,
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: 'white',
    transform: [{rotate: '45deg'}],
  },
});
