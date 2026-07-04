export type DiceSides = 4 | 6 | 8 | 10 | 12 | 20 | 100;

export type DiceTone = 'amber' | 'steel' | 'verdant' | 'ember' | 'violet' | 'gold' | 'azure';

export type DiceDefinition = {
  sides: DiceSides;
  label: string;
  tone: DiceTone;
};

export type DiceRoll = {
  createdAt: string;
  die: DiceDefinition;
  id: string;
  modifier: number;
  subtotal: number;
  total: number;
  values: number[];
};

export type RollAnimationRequest = {
  sides: DiceSides;
  value: number;
};
