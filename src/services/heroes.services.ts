import axios from 'axios';

export const fetchDotaHeroes = async () =>
  axios.get('https://api.opendota.com/api/heroes');

export const fetchHeroImage = async (heroName: string) =>
  axios.get(
    `https://cdn.dota2.com/apps/dota2/images/heroes/${heroName}_full.png`,
  );
