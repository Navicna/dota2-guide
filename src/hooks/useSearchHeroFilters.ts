import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useDotaGuide} from '../context/DotaGuideContext';
import {DotaHeroesInterfaceUpdated} from '../interfaces/heroes.interfaces';
import {
  getHeroComplexitySearchFilter,
  getHeroAttributeSearchFilter,
} from '../redux/dota.selectors';

export default function useSearchHeroFilters() {
  const {dotaHeroes, dotaHeroesLoading} = useDotaGuide();
  const [searchText, setSearchText] = useState('');
  const [filteredDotaHeroes, setFilteredDotaHeroes] = useState(dotaHeroes);

  const heroComplexitySearchFilter = useSelector(getHeroComplexitySearchFilter);
  const heroAttibuteSearchFilter = useSelector(getHeroAttributeSearchFilter);

  const hasComplexitySearchFilter = heroComplexitySearchFilter > 0;
  const hasAttributeSearchFilter = heroAttibuteSearchFilter !== '';
  const hasTextSearchFilter = searchText !== '';

  function handleSearchHeroes(text: string) {
    setSearchText(text);
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
      setFilteredDotaHeroes(filterHeroes);
    } else {
      setFilteredDotaHeroes(dotaHeroes);
    }
  }, [heroComplexitySearchFilter, heroAttibuteSearchFilter, searchText]);

  return {
    handleSearchHeroes,
    searchText,
    filteredDotaHeroes,
    dotaHeroesLoading,
  };
}
