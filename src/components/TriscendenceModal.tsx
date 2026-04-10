import './TriscendenceModal.css';
import { useState } from 'react';
import { TieredMode } from '../types/anomaly';
import { Character, QA_KEYS, QAKey } from '../types/character';
import { DiceRollResult, calcTierResult } from '../utils/rollDice';

interface Props {
  result: DiceRollResult;
  tieredMode?: TieredMode;
  qualityAssurances: Character['qualityAssurances'];
  onApply: (updated: DiceRollResult) => void;
  onApplyQA: (updated: Character['qualityAssurances']) => void;
  onCommend: () => void;
  onDismiss: () => void;
}

export function TriscendenceModal({ result, tieredMode, qualityAssurances, onApply, onApplyQA, onCommend, onDismiss }: Props) {
  const [allHandsCount, setAllHandsCount] = useState(1);
  const [qaDeltas, setQaDeltas] = useState<Partial<Record<QAKey, number>>>({});

  const totalSpent = Object.values(qaDeltas).reduce((s, n) => s + (n ?? 0), 0);

  const eligibleKeys = QA_KEYS.filter(
    (key) => qualityAssurances[key].max > 0 && qualityAssurances[key].current < qualityAssurances[key].max
  );

  function handleAllHands() {
    const newEffective = result.effectiveThrees + allHandsCount;
    const { tier, tieredStacks } = calcTierResult(newEffective, tieredMode);
    onApply({ ...result, effectiveThrees: newEffective, tier, tieredStacks });
  }

  function incrementQA(key: QAKey) {
    if (totalSpent >= 3) return;
    const delta = qaDeltas[key] ?? 0;
    if (qualityAssurances[key].current + delta >= qualityAssurances[key].max) return;
    setQaDeltas((prev) => ({ ...prev, [key]: delta + 1 }));
  }

  function decrementQA(key: QAKey) {
    const delta = qaDeltas[key] ?? 0;
    if (delta <= 0) return;
    setQaDeltas((prev) => ({ ...prev, [key]: delta - 1 }));
  }

  function handleCircleBack() {
    const updated = { ...qualityAssurances };
    QA_KEYS.forEach((key) => {
      const delta = qaDeltas[key] ?? 0;
      if (delta > 0) {
        updated[key] = { ...updated[key], current: updated[key].current + delta };
      }
    });
    onApplyQA(updated);
  }

  return (
    <div className="triscendence-overlay" onClick={onDismiss}>
      <div className="triscendence-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="triscendence-title">Triscendence</h2>
        <p className="triscendence-body">Three threes. Choose your response.</p>

        <div className="triscendence-options">

          {/* Option 1: All Hands */}
          <div className="triscendence-option-card">
            <p className="triscendence-option-title">All Hands</p>
            <p className="triscendence-option-desc">Add 3s to this roll.</p>
            <div className="triscendence-option-controls">
              <button
                type="button"
                className="triscendence-count-btn"
                onClick={() => setAllHandsCount((n) => Math.max(1, n - 1))}
                disabled={allHandsCount <= 1}
              >−</button>
              <span className="triscendence-count-display">{allHandsCount}</span>
              <button
                type="button"
                className="triscendence-count-btn"
                onClick={() => setAllHandsCount((n) => n + 1)}
              >+</button>
              <button
                type="button"
                className="triscendence-option-accept"
                onClick={handleAllHands}
              >Accept</button>
            </div>
          </div>

          {/* Option 2: Circle Back */}
          <div className="triscendence-option-card">
            <p className="triscendence-option-title">Circle Back</p>
            <p className="triscendence-option-desc">
              Replenish up to 3 spent Quality Assurances. ({3 - totalSpent} remaining)
            </p>
            {eligibleKeys.length === 0
              ? <p className="triscendence-option-empty">No spent Quality Assurances available.</p>
              : (
                <div className="circle-back-list">
                  {eligibleKeys.map((key) => {
                    const qa = qualityAssurances[key];
                    const delta = qaDeltas[key] ?? 0;
                    const displayed = qa.current + delta;
                    return (
                      <div key={key} className="circle-back-row">
                        <span className="circle-back-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <div className="triscendence-option-controls">
                          <button
                            type="button"
                            className="triscendence-count-btn"
                            onClick={() => decrementQA(key)}
                            disabled={delta <= 0}
                          >−</button>
                          <span className="triscendence-count-display">{displayed}/{qa.max}</span>
                          <button
                            type="button"
                            className="triscendence-count-btn"
                            onClick={() => incrementQA(key)}
                            disabled={totalSpent >= 3 || displayed >= qa.max}
                          >+</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            }
            <div className="triscendence-option-controls" style={{ marginTop: '0.5rem' }}>
              <button
                type="button"
                className="triscendence-option-accept"
                onClick={handleCircleBack}
                disabled={totalSpent === 0}
              >Accept</button>
            </div>
          </div>

          {/* Option 3: Employee of the Moment */}
          <div className="triscendence-option-card">
            <p className="triscendence-option-title">Employee of the Moment</p>
            <p className="triscendence-option-desc">Gain 3 Commendations.</p>
            <div className="triscendence-option-controls">
              <button
                type="button"
                className="triscendence-option-accept"
                onClick={onCommend}
              >Accept</button>
            </div>
          </div>

        </div>

        <button type="button" className="triscendence-dismiss" onClick={onDismiss}>
          Dismiss
        </button>
      </div>
    </div>
  );
}
