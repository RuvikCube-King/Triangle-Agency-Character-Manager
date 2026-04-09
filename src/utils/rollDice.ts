import { TieredMode } from '../types/anomaly';

export interface DiceRollResult {
  dice: number[];          // raw face values (1–4), always length 6
  burnedIndices: number[]; // indices into dice[] whose 3s were negated by burnout
  effectiveThrees: number;
  tier: 'success' | 'tiered' | 'failure';
  tieredStacks: number;
}

export function rollDicePool(
  burnout: number,
  tieredMode: TieredMode = 'per-three'
): DiceRollResult {
  const dice = Array.from({ length: 6 }, () => Math.floor(Math.random() * 4) + 1);

  const threeIndices = dice.reduce<number[]>((acc, face, i) => {
    if (face === 3) acc.push(i);
    return acc;
  }, []);

  const burnoutApplied = Math.min(burnout, threeIndices.length);
  const burnedIndices = threeIndices.slice(0, burnoutApplied);
  const effectiveThrees = threeIndices.length - burnoutApplied;

  if (effectiveThrees === 0) {
    return { dice, burnedIndices, effectiveThrees: 0, tier: 'failure', tieredStacks: 0 };
  }

  const stacks =
    tieredMode === 'per-extra'
      ? effectiveThrees - 1
      : Math.floor(effectiveThrees / 3);

  return {
    dice,
    burnedIndices,
    effectiveThrees,
    tier: stacks > 0 ? 'tiered' : 'success',
    tieredStacks: stacks,
  };
}
