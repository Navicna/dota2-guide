import {useEffect, useState, useRef} from 'react';
import {Animated} from 'react-native';
import {useSelector} from 'react-redux';
import {useDotaGuide} from '../context/DotaGuideContext';
import {DotaHeroesInterfaceUpdated} from '../interfaces/heroes.interfaces';
import {
  getHeroComplexitySearchFilter,
  getHeroAttributeSearchFilter,
} from '../redux/dota.selectors';

const ANIMATE_TIMING = 100;

export default function useSearchHeroFilters() {
  const {dotaHeroes, dotaHeroesLoading} = useDotaGuide();
  const [searchText, setSearchText] = useState('');
  const [filteredDotaHeroes, setFilteredDotaHeroes] = useState(dotaHeroes);

  const heroComplexitySearchFilter = useSelector(getHeroComplexitySearchFilter);
  const heroAttibuteSearchFilter = useSelector(getHeroAttributeSearchFilter);

  const hasComplexitySearchFilter = heroComplexitySearchFilter > 0;
  const hasAttributeSearchFilter = heroAttibuteSearchFilter !== '';
  const hasTextSearchFilter = searchText !== '';

  const fadeAnimation = useRef(new Animated.Value(1)).current;

  function handleSearchHeroes(text: string) {
    setSearchText(text);
  }

  function handleFlatlistFadeTransition(data: any) {
    Animated.timing(fadeAnimation, {
      toValue: 0,
      duration: ANIMATE_TIMING,
    } as never).start(({finished}) => {
      if (finished) {
        setFilteredDotaHeroes(data);
        setTimeout(() => {
          Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: ANIMATE_TIMING,
          } as never).start();
        }, ANIMATE_TIMING);
      }
    });
  }

  useEffect(() => {
    const filterHeroes = dotaHeroes.filter(
      ({heroComplexity, heroName, primaryAttr}: DotaHeroesInterfaceUpdated) => {
        const filterByHeroName = heroName
          .toLowerCase()
          .startsWith(searchText.toLowerCase());
        const filterByAttribute = heroAttibuteSearchFilter === primaryAttr;
        const filterByComplexity =
          heroComplexitySearchFilter === heroComplexity;

        //Search in 3 cases
        if (
          hasTextSearchFilter &&
          hasAttributeSearchFilter &&
          hasComplexitySearchFilter
        ) {
          return filterByHeroName && filterByAttribute && filterByComplexity;
        }
        // Search in 2 cases
        // Name & Attribute
        if (
          hasTextSearchFilter &&
          hasAttributeSearchFilter &&
          !hasComplexitySearchFilter
        ) {
          return filterByHeroName && filterByAttribute;
        }
        // Name & Complexity
        if (
          hasTextSearchFilter &&
          hasComplexitySearchFilter &&
          !hasAttributeSearchFilter
        ) {
          return filterByHeroName && filterByComplexity;
        }
        // Attribute & Complexity
        if (hasAttributeSearchFilter && hasComplexitySearchFilter) {
          return filterByAttribute && filterByComplexity;
        }

        // Name
        if (hasTextSearchFilter) {
          return filterByHeroName;
        } else if (hasAttributeSearchFilter) {
          return filterByAttribute;
        } else if (hasComplexitySearchFilter) {
          return filterByComplexity;
        }
      },
    );
    if (
      hasTextSearchFilter ||
      hasComplexitySearchFilter ||
      hasAttributeSearchFilter
    ) {
      handleFlatlistFadeTransition(filterHeroes);
    } else {
      handleFlatlistFadeTransition(dotaHeroes);
    }
  }, [heroComplexitySearchFilter, heroAttibuteSearchFilter, searchText]);

  return {
    handleSearchHeroes,
    searchText,
    filteredDotaHeroes,
    dotaHeroesLoading,
    fadeAnimation,
  };
}
