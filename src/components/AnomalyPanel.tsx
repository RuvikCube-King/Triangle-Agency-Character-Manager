import { useState } from 'react';
import { AnomalyDefinition } from '../types/anomaly';
import { AbilityProgress, AnswerCheckboxes, CharacterAnomaly } from '../types/character';
import { DiceRollResult, rollDicePool } from '../utils/rollDice';

interface Props {
  anomaly: CharacterAnomaly;
  definition: AnomalyDefinition;
  onUpdateAnomaly: (updated: CharacterAnomaly) => void;
  burnout: number;
}

const OUTCOME_ICONS: Record<string, string> = {
  success: '▲',
  tiered: '★',
  failure: '✕',
};

const OUTCOME_CLASSES: Record<string, string> = {
  success: 'outcome-success',
  tiered: 'outcome-tiered',
  failure: 'outcome-failure',
};

export function AnomalyPanel({ anomaly, definition, onUpdateAnomaly, burnout }: Props) {
  const [rollResults, setRollResults] = useState<Partial<Record<string, DiceRollResult>>>({});
  function getProgress(abilityName: string): AbilityProgress {
    const existing = anomaly.personalizationProgress[abilityName];
    const defaultBoxes: AnswerCheckboxes = [false, false, false];
    return existing ?? { practiced: false, answers: [defaultBoxes, [...defaultBoxes] as AnswerCheckboxes] };
  }

  function togglePracticed(abilityName: string) {
    const existing = getProgress(abilityName);
    onUpdateAnomaly({
      ...anomaly,
      personalizationProgress: {
        ...anomaly.personalizationProgress,
        [abilityName]: { ...existing, practiced: !existing.practiced },
      },
    });
  }

  function toggleCheckbox(abilityName: string, answerIndex: 0 | 1, boxIndex: number) {
    const existing = getProgress(abilityName);
    const answers: [AnswerCheckboxes, AnswerCheckboxes] = [
      [...existing.answers[0]] as AnswerCheckboxes,
      [...existing.answers[1]] as AnswerCheckboxes,
    ];
    answers[answerIndex][boxIndex] = !answers[answerIndex][boxIndex];
    onUpdateAnomaly({
      ...anomaly,
      personalizationProgress: {
        ...anomaly.personalizationProgress,
        [abilityName]: { ...existing, answers },
      },
    });
  }

  return (
    <div className="anomaly-panel">
      <h2 className="anomaly-panel-title">{definition.name}</h2>
      <div className="ability-list">
        {definition.abilities.map((ability) => {
          const progress = getProgress(ability.name);
          return (
            <div key={ability.name} className="ability-card">
              <div className="ability-header">
                <label className="ability-practiced-label">
                  <input
                    type="checkbox"
                    className="ability-practiced-checkbox"
                    checked={progress.practiced}
                    onChange={() => togglePracticed(ability.name)}
                  />
                  Practiced
                </label>
                <h3 className="ability-name">{ability.name}</h3>
                <button
                  type="button"
                  className="ability-roll-stat"
                  onClick={() => {
                    const result = rollDicePool(burnout, ability.tieredMode);
                    setRollResults((prev) => ({ ...prev, [ability.name]: result }));
                  }}
                >
                  Roll {ability.rollStat.charAt(0).toUpperCase() + ability.rollStat.slice(1)}
                </button>
              </div>
              <p className="ability-description">{ability.description}</p>

              <div className="ability-outcomes">
                {ability.outcomes.map((outcome) => (
                  <div key={outcome.trigger} className={`outcome-row ${OUTCOME_CLASSES[outcome.trigger]}`}>
                    <span className="outcome-icon">{OUTCOME_ICONS[outcome.trigger]}</span>
                    <div className="outcome-content">
                      <strong>{outcome.triggerLabel},</strong> {outcome.description}
                      {outcome.options && (
                        <ul className="outcome-options">
                          {outcome.options.map((opt) => <li key={opt}>{opt}</li>)}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {rollResults[ability.name] && (() => {
                const r = rollResults[ability.name]!;
                const burnedSet = new Set(r.burnedIndices);
                return (
                  <div className="ability-roll-result">
                    <button
                      type="button"
                      className="roll-result-clear"
                      onClick={() => setRollResults((prev) => { const n = { ...prev }; delete n[ability.name]; return n; })}
                      aria-label="Clear roll result"
                    >×</button>
                    <div className="roll-result-dice">
                      {r.dice.map((face, i) => (
                        <span
                          key={i}
                          className={`die-face${face === 3 && !burnedSet.has(i) ? ' die-face--hit' : ''}${burnedSet.has(i) ? ' die-face--burned' : ''}`}
                        >
                          {face}
                        </span>
                      ))}
                    </div>
                    <div className="roll-result-summary">
                      <span className={`roll-result-tier roll-result-tier--${r.tier}`}>
                        {r.tier === 'success' ? '▲ Success' : r.tier === 'tiered' ? '★ Tiered' : '✕ Failure'}
                      </span>
                      <span className="roll-result-detail">
                        {r.effectiveThrees === 0
                          ? r.burnedIndices.length > 0 ? `${r.burnedIndices.length} burned` : 'No threes'
                          : r.tier === 'tiered'
                          ? `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''} — ${r.tieredStacks} stack${r.tieredStacks !== 1 ? 's' : ''}`
                          : `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''}`}
                      </span>
                    </div>
                  </div>
                );
              })()}

              <div className="personalization-box">
                <p className="personalization-question">{ability.personalization.question}</p>
                {ability.personalization.answers.map((answer, answerIndex) => {
                  const checkboxes: AnswerCheckboxes = progress.answers[answerIndex as 0 | 1];
                  return (
                    <div key={answerIndex} className="personalization-answer">
                      <span className="personalization-answer-text">{answer.text}</span>
                      <div className="personalization-checkboxes">
                        {checkboxes.map((checked, boxIndex) => (
                          <input
                            key={boxIndex}
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCheckbox(ability.name, answerIndex as 0 | 1, boxIndex)}
                            className="personalization-checkbox"
                          />
                        ))}
                        <span className="personalization-code">{answer.code}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
