import axios from 'axios';
import {getAttribute} from '../utils/String';

export const fetchDotaHeroes = async () =>
  axios.get('https://api.opendota.com/api/heroes');

export const fetchHeroImage = (heroPath: string) =>
  `https://cdn.dota2.com/apps/dota2/images/heroes/${heroPath}_full.png`;

export const fetchHeroCharacter = (heroPath: string) =>
  `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroPath}.png`;

export const fetchHeroAttribute = (attr: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${getAttribute(
    attr,
  )}.png`;
};
