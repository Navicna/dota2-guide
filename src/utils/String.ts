export const getAttribute = (flag: string) =>
  ({
    str: 'strength',
    agi: 'agility',
    int: 'intelligence',
  }[flag]);
