import { TieredMode } from '../types/anomaly';

export function calcTierResult(
  effectiveThrees: number,
  tieredMode: TieredMode = 'per-three'
): { tier: 'success' | 'tiered' | 'failure'; tieredStacks: number } {
  if (effectiveThrees === 0) return { tier: 'failure', tieredStacks: 0 };
  const stacks =
    tieredMode === 'per-extra' ? effectiveThrees - 1 :
    tieredMode === 'six-plus'  ? (effectiveThrees >= 6 ? 1 : 0) :
    tieredMode === 'per-one'   ? effectiveThrees :
    Math.floor(effectiveThrees / 3);
  return { tier: stacks > 0 ? 'tiered' : 'success', tieredStacks: stacks };
}

export interface DiceRollResult {
  dice: number[];          // raw face values (1–4), always length 6
  burnedIndices: number[]; // indices into dice[] whose 3s were negated by burnout
  effectiveThrees: number;
  tier: 'success' | 'tiered' | 'failure';
  tieredStacks: number;
  triscendence: boolean;   // true when raw three count === 3, before burnout
  burnout: number;         // total burnout applied to this roll
}

export function calcChaos(result: DiceRollResult): number {
  if (result.triscendence || result.effectiveThrees === 3) return 0;
  return (result.dice.length - result.effectiveThrees) + result.burnout;
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

  const triscendence = threeIndices.length === 3;
  const burnoutApplied = Math.min(burnout, threeIndices.length);
  const burnedIndices = threeIndices.slice(0, burnoutApplied);
  let effectiveThrees = 0;

  if(!triscendence)
    effectiveThrees = threeIndices.length - burnoutApplied;
  else
    effectiveThrees = 3;

  if (effectiveThrees === 0) {
    return { dice, burnedIndices, effectiveThrees: 0, tier: 'failure', tieredStacks: 0, triscendence, burnout };
  }

  const stacks =
    tieredMode === 'per-extra' ? effectiveThrees - 1 :
    tieredMode === 'six-plus'  ? (effectiveThrees >= 6 ? 1 : 0) :
    tieredMode === 'per-one'   ? effectiveThrees :
    Math.floor(effectiveThrees / 3);

  return {
    dice,
    burnedIndices,
    effectiveThrees,
    tier: stacks > 0 ? 'tiered' : 'success',
    tieredStacks: stacks,
    triscendence,
    burnout,
  };
}
