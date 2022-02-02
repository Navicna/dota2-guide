export const getAttribute = (flag: string) =>
  ({
    str: 'strength',
    agi: 'agility',
    int: 'intelligence',
  }[flag]);

export function handleHeroName(heroName: string) {
  return heroName.replace(' ', '\n');
}

export function handleHeroComplexity(heroPath: string) {
  if (
    heroPath === 'arc_warden' ||
    heroPath === 'brewmaster' ||
    heroPath === 'chen' ||
    heroPath === 'earth_spitit' ||
    heroPath === 'invoker' ||
    heroPath === 'wisp' ||
    heroPath === 'meepo' ||
    heroPath === 'lone_druid' ||
    heroPath === 'morphiling' ||
    heroPath === 'oracle' ||
    heroPath === 'rubick' ||
    heroPath === 'visage'
  ) {
    return 3;
  }
  if (
    heroPath === 'ancient_apparition' ||
    heroPath === 'bane' ||
    heroPath === 'batrider' ||
    heroPath === 'beastmaster' ||
    heroPath === 'broodmother' ||
    heroPath === 'clinkz' ||
    heroPath === 'clockwerk' ||
    heroPath === 'dark-willow' ||
    heroPath === 'disruptor' ||
    heroPath === 'doom' ||
    heroPath === 'earthshaker' ||
    heroPath === 'elder_titan' ||
    heroPath === 'ember spirit' ||
    heroPath === 'enchantress' ||
    heroPath === 'enigma' ||
    heroPath === 'void' ||
    heroPath === 'grimstroke' ||
    heroPath === 'hoodwink' ||
    heroPath === 'keeper_of_the_light' ||
    heroPath === 'kunkka' ||
    heroPath === 'life_stealer' ||
    heroPath === 'lycan' ||
    heroPath === 'magnus' ||
    heroPath === 'marci' ||
    heroPath === 'mirana' ||
    heroPath === 'monkey_king' ||
    heroPath === 'naga_siren' ||
    heroPath === 'furion' ||
    heroPath === 'nyx_assassin' ||
    heroPath === 'outworld_destroyer' ||
    heroPath === 'pangolier' ||
    heroPath === 'phantom_lancer' ||
    heroPath === 'phoenix' ||
    heroPath === 'puck' ||
    heroPath === 'pudge' ||
    heroPath === 'pugna' ||
    heroPath === 'queen_of_pain' ||
    heroPath === 'sand_king' ||
    heroPath === 'shadow_demon' ||
    heroPath === 'nevermore' ||
    heroPath === 'silencer' ||
    heroPath === 'slark' ||
    heroPath === 'spectre' ||
    heroPath === 'storm_spirit' ||
    heroPath === 'techies' ||
    heroPath === 'templar_assassin' ||
    heroPath === 'terror_blade' ||
    heroPath === 'timbersaw' ||
    heroPath === 'tinker' ||
    heroPath === 'tiny' ||
    heroPath === 'treant_protector' ||
    heroPath === 'troll_warlord' ||
    heroPath === 'underlord' ||
    heroPath === 'void_spirit' ||
    heroPath === 'weaver' ||
    heroPath === 'windranger' ||
    heroPath === 'winter_wyvern'
  ) {
    return 2;
  }

  return 1;
}
