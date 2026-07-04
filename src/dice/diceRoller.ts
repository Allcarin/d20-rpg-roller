import type { DiceSides } from './diceTypes';

export const ROLL_TICKS = 18;

export function rollDie(sides: DiceSides): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function easeOutCubic(progress: number): number {
  return 1 - Math.pow(1 - progress, 3);
}

export function createSpinTarget() {
  const fullTurn = Math.PI * 2;

  return {
    x: fullTurn * (2 + Math.floor(Math.random() * 3)),
    y: fullTurn * (3 + Math.floor(Math.random() * 3)),
    z: fullTurn * (2 + Math.floor(Math.random() * 2)),
  };
}
