import React from 'react';

import {
  DotaHeroesInterface,
  DotaHeroesInterfaceUpdated,
} from '../interfaces/heroes.interfaces';

import {
  fetchDotaHeroes,
  fetchHeroAttribute,
  fetchHeroCharacter,
  fetchHeroImage,
} from '../services/heroes.services';
import {getHeroSummary} from '../utils/HeroSummary';
import {handleHeroComplexity} from '../utils/String';

interface IDotaGuideContext {
  dotaHeroes: any;
  getDotaHeroes(): void;
  dotaHeroesLoading: boolean;
}

const DotaGuideContext = React.createContext<IDotaGuideContext>({
  dotaHeroes: [],
  getDotaHeroes: () => null,
  dotaHeroesLoading: false,
});

const DotaGuideProvider: React.FC<{
  children: JSX.Element;
}> = ({children}) => {
  const [dotaHeroes, setDotaHeroes] = React.useState([]);
  const [dotaHeroesLoading, setDotaHeroesLoading] = React.useState(false);

  const handleHeroPath = (path: string) => path.replace('npc_dota_hero_', '');

  function handleDotaHeroesJSON(data: DotaHeroesInterface[]) {
    return data.map(
      ({attack_type, id, legs, localized_name, name, primary_attr, roles}) => {
        const heroPath = handleHeroPath(name);
        return {
          id,
          attackType: attack_type,
          legs,
          heroPath: heroPath,
          heroName: localized_name,
          primaryAttr: primary_attr,
          roles,
          heroComplexity: handleHeroComplexity(heroPath),
          heroImage: fetchHeroImage(heroPath),
          heroCharacter: fetchHeroCharacter(heroPath),
          heroAttribute: fetchHeroAttribute(primary_attr),
          heroSummary: getHeroSummary(heroPath),
        };
      },
    );
  }

  async function getDotaHeroes() {
    setDotaHeroesLoading(true);
    try {
      const response = await fetchDotaHeroes();
      if (response) {
        const {data} = response;

        const dotaHeroesUpdated = handleDotaHeroesJSON(data);

        setDotaHeroes(dotaHeroesUpdated);
      }
    } catch (e) {
      return null;
    } finally {
      setDotaHeroesLoading(false);
    }
  }

  React.useEffect(() => {
    if (dotaHeroes.length > 0) {
      return;
    }
    getDotaHeroes();
  }, [dotaHeroes]);

  const defaultContext = {
    dotaHeroes,
    dotaHeroesLoading,
    getDotaHeroes,
  };

  return (
    <DotaGuideContext.Provider value={defaultContext}>
      {children}
    </DotaGuideContext.Provider>
  );
};

const useDotaGuide = () => React.useContext(DotaGuideContext);
export {DotaGuideProvider, useDotaGuide};
