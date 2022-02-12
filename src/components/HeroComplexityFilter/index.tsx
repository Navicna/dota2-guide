import React from 'react';
import {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {dispatchHeroComplexityFilter} from '../../redux/dota.actions';
import {ViewBox} from '../../ui';
import {Diamond} from '../Diamond';

export function HeroComplexityFilter() {
  const dispatch = useDispatch();
  const [complexityFilter, setComplexityFilter] = useState(-1);
  const [isActiveFilter, setIsActiveFilter] = useState(false);

  function handleDiamondBgColor(index: number) {
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
    <ViewBox flexDirection="row" alignItems="center" justifyContent="center">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <TouchableOpacity onPress={() => handleComplexityHeroFilter(i)}>
            <Diamond key={i} bgColor={handleDiamondBgColor(i)} />
          </TouchableOpacity>
        ))}
    </ViewBox>
  );
}
