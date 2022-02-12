import {useEffect, useState} from 'react';
import {DotaHeroesInterfaceUpdated} from '../interfaces/heroes.interfaces';

export function useCarouselHeroesDetails(
  filteredDotaHeroes: DotaHeroesInterfaceUpdated[],
  heroDetailsUpdated: DotaHeroesInterfaceUpdated,
) {
  const [heroDetails, setHeroDetails] = useState(heroDetailsUpdated);
  const [positionArray, setPositionArray] = useState(-1);
  const [disableLeftChevron, setDisableLeftChevron] = useState(
    positionArray === 0,
  );
  const [disableRightChevron, setDisableRightChevron] = useState(false);

  function handleHeroCarousel(type: 'forward' | 'back') {
    if (type === 'forward') {
      const fowardHero = filteredDotaHeroes.find((_, index) => {
        setPositionArray(index);

        return index === positionArray + 1;
      });
      if (fowardHero) {
        setHeroDetails(fowardHero);
        setDisableLeftChevron(false);
      }
    } else {
      const backHero = filteredDotaHeroes.find((_, index) => {
        setPositionArray(index);

        return index === positionArray - 1;
      });
      if (backHero) {
        setHeroDetails(backHero);
        setDisableRightChevron(false);
      }
    }
  }

  useEffect(() => {
    filteredDotaHeroes.map((hero, index) => {
      if (hero.id === heroDetails.id) {
        setPositionArray(index);
      }
    });

    if (positionArray === 0) {
      setDisableLeftChevron(true);
    }
    if (positionArray === filteredDotaHeroes.length - 1) {
      setDisableRightChevron(true);
    }
  }, [positionArray]);

  return {
    handleHeroCarousel,
    heroDetails,
    disableLeftChevron,
    disableRightChevron,
  };
}
