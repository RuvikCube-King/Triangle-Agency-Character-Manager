import './QASpendModal.css';
import { useState } from 'react';
import { TieredMode } from '../types/anomaly';
import { QAKey, QualityAssurance } from '../types/character';
import { DiceRollResult, calcTierResult } from '../utils/rollDice';

interface Props {
  abilityName: string;
  rollStat: QAKey;
  qa: QualityAssurance;
  originalResult: DiceRollResult;
  tieredMode?: TieredMode;
  onAccept: (modifiedResult: DiceRollResult, spent: number) => void;
}

export function QASpendModal({ abilityName, rollStat, qa, originalResult, tieredMode, onAccept }: Props) {
  const [spentCount, setSpentCount] = useState(0);

  const nonThreeIndices = originalResult.dice
    .map((face, i) => (face !== 3 ? i : -1))
    .filter((i) => i >= 0);
  const maxSpendable = Math.min(qa.current, originalResult.burnedIndices.length + nonThreeIndices.length);

  const unBurnCount = Math.min(spentCount, originalResult.burnedIndices.length);
  const unburnedSet = new Set(originalResult.burnedIndices.slice(0, unBurnCount));
  const remainingBurnedSet = new Set(originalResult.burnedIndices.slice(unBurnCount));
  const flippedSet = new Set(nonThreeIndices.slice(0, spentCount - unBurnCount));

  const newEffectiveThrees = originalResult.effectiveThrees + spentCount;
  const { tier, tieredStacks } = calcTierResult(newEffectiveThrees, tieredMode);
  const currentDisplayed = qa.current - spentCount;

  function handlePipClick(pipIndex: number) {
    if (pipIndex < currentDisplayed) {
      // clicking a filled pip — spend one
      if (spentCount < maxSpendable) setSpentCount((n) => n + 1);
    } else if (pipIndex < qa.current) {
      // clicking a spent pip — unspend one
      setSpentCount((n) => Math.max(0, n - 1));
    }
  }

  function getDieClass(i: number): string {
    if (flippedSet.has(i)) return 'die-face die-face--boosted';
    if (unburnedSet.has(i)) return 'die-face die-face--hit';
    if (remainingBurnedSet.has(i)) return 'die-face die-face--burned';
    if (originalResult.dice[i] === 3) return 'die-face die-face--hit';
    return 'die-face';
  }

  function getDieFace(i: number): number {
    return flippedSet.has(i) ? 3 : originalResult.dice[i];
  }

  function handleAccept() {
    const modifiedDice = [...originalResult.dice];
    flippedSet.forEach((i) => { modifiedDice[i] = 3; });
    onAccept(
      {
        ...originalResult,
        dice: modifiedDice,
        burnedIndices: [...remainingBurnedSet],
        effectiveThrees: newEffectiveThrees,
        tier,
        tieredStacks,
      },
      spentCount,
    );
  }

  const rollStatLabel = rollStat.charAt(0).toUpperCase() + rollStat.slice(1);

  return (
    <div className="qa-spend-overlay">
      <div className="qa-spend-modal">
        <p className="qa-spend-title">Spend Quality Assurance?</p>
        <p className="qa-spend-ability-name">{abilityName}</p>

        <div className="qa-spend-qa-row">
          <span className="qa-spend-qa-label">{rollStatLabel}</span>
          <div className="qa-spend-pips">
            {Array.from({ length: qa.max }, (_, i) => {
              let cls = 'qa-spend-pip pip-empty';
              if (i < currentDisplayed) cls = 'qa-spend-pip pip-filled';
              else if (i < qa.current) cls = 'qa-spend-pip pip-spent';
              return (
                <button
                  key={i}
                  type="button"
                  className={cls}
                  onClick={() => handlePipClick(i)}
                  aria-label={`${rollStatLabel} pip ${i + 1}`}
                />
              );
            })}
          </div>
          <span className="qa-spend-fraction">{currentDisplayed}/{qa.max}</span>
        </div>

        <div className="qa-spend-dice">
          {originalResult.dice.map((_, i) => (
            <span key={i} className={getDieClass(i)}>
              {getDieFace(i)}
            </span>
          ))}
        </div>

        <div className="qa-spend-summary">
          <span className={`roll-result-tier roll-result-tier--${tier}`}>
            {tier === 'success' ? '▲ Success' : tier === 'tiered' ? '★ Tiered' : '✕ Failure'}
          </span>
          <span className="roll-result-detail">
            {newEffectiveThrees === 0
              ? (remainingBurnedSet.size > 0 ? `${remainingBurnedSet.size} burned` : 'No threes')
              : `${newEffectiveThrees} three${newEffectiveThrees !== 1 ? 's' : ''}${tieredStacks > 0 ? ` — ${tieredStacks} stack${tieredStacks !== 1 ? 's' : ''}` : ''}`}
          </span>
          <span className="roll-result-chaos">
            ◈ {(originalResult.triscendence || newEffectiveThrees === 3) ? 0 : (originalResult.dice.length - newEffectiveThrees) + originalResult.burnout} chaos
          </span>
        </div>

        <button type="button" className="qa-spend-accept" onClick={handleAccept}>
          Accept
        </button>
      </div>
    </div>
  );
}
