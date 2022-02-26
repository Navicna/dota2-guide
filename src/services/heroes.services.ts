import axios from 'axios';
import {getAttribute} from '../utils/String';

export const fetchDotaHeroes = async () =>
  axios.get('https://api.opendota.com/api/heroes');

export const fetchHeroImage = (heroPath: string) =>
  `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroPath}.png`;

export const fetchHeroCharacter = (heroPath: string) =>
  `https://cdn.cloudflare.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroPath}.png`;

export const fetchHeroAttribute = (attr: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${getAttribute(
    attr,
  )}.png`;
};

export const fetchAttributesImage = (attr: string) => {
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/herogrid/filter-${attr}-active.png`;
};
