export interface DotaHeroesInterface {
  id: number;
  name: string;
  localized_name: string;
  primary_attr: string;
  attack_type: string;
  roles: string[];
  legs: number;
}

export interface DotaHeroesInterfaceUpdated {
  id: number;
  heroPath: string;
  heroName: string;
  primaryAttr: string;
  attackType: string;
  roles: string[];
  legs: number;
  heroImage?: string;
}
