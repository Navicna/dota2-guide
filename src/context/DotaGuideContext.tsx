import React from 'react';
import {
  DotaHeroesInterface,
  DotaHeroesInterfaceUpdated,
} from '../interfaces/heroes.interfaces';

import {fetchDotaHeroes} from '../services/heroes.services';

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

  function handleDotaHeroesJSON(
    data: DotaHeroesInterface[],
  ): DotaHeroesInterfaceUpdated[] {
    return data.map(
      ({attack_type, id, legs, localized_name, name, primary_attr, roles}) => ({
        id,
        attackType: attack_type,
        legs,
        heroPath: name.replace('npc_dota_hero_', ''),
        heroName: localized_name,
        primaryAttr: primary_attr,
        roles,
      }),
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
