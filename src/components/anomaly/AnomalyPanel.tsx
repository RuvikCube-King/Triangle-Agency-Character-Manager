import './AnomalyPanel.css';
import { useState } from 'react';
import { AnomalyDefinition, TieredMode } from '../../types/anomaly';
import { AbilityProgress, AnswerCheckboxes, CharacterAnomaly, Character, OutcomeAddition } from '../../types/character';
import { DiceRollResult, rollDicePool, calcChaos } from '../../utils/rollDice';
import { TriscendenceModal } from './TriscendenceModal';
import { QASpendModal } from './QASpendModal';
import { PlaywalledDocument } from '../../types/playwalleddocument';
import { DocumentCard } from '../documents/DocumentCard';

interface Props {
  anomaly: CharacterAnomaly;
  definition: AnomalyDefinition;
  onUpdateAnomaly: (updated: CharacterAnomaly, earnCode?: string) => void;
  burnout: number;
  qualityAssurances: Character['qualityAssurances'];
  onUpdateQA: (updated: Character['qualityAssurances']) => void;
  onCommend: () => void;
  unlockedDocs?: PlaywalledDocument[];
  onGoto?: (code: string) => void;
  earnedCodes?: string[];
}

const OUTCOME_ICONS: Record<string, string> = {
  success: '▲',
  tiered: '★',
  failure: '✕',
  triscendence: '✦',
};

const OUTCOME_CLASSES: Record<string, string> = {
  success: 'outcome-success',
  tiered: 'outcome-tiered',
  failure: 'outcome-failure',
  triscendence: 'outcome-triscendence',
};

function getRollDetail(r: DiceRollResult, tieredMode?: TieredMode): string {
  if (r.effectiveThrees === 0) {
    return r.burnedIndices.length > 0 ? `${r.burnedIndices.length} burned` : 'No threes';
  }
  if (r.tier === 'tiered') {
    if (tieredMode === 'six-plus') return `${r.effectiveThrees} threes — threshold met`;
    if (tieredMode === 'per-one')  return `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''} to spend`;
    return `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''} — ${r.tieredStacks} stack${r.tieredStacks !== 1 ? 's' : ''}`;
  }
  if (tieredMode === 'six-plus') return `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''} — need 6 for threshold`;
  return `${r.effectiveThrees} three${r.effectiveThrees !== 1 ? 's' : ''}`;
}

export function AnomalyPanel({ anomaly, definition, onUpdateAnomaly, burnout, qualityAssurances, onUpdateQA, onCommend, unlockedDocs, onGoto, earnedCodes }: Props) {
  const allAbilities = [
    ...definition.abilities.map((base) => {
      const additions = (anomaly.outcomeAdditions ?? []).filter(
        (a) => a.targetAbilityName === base.name
      );
      if (additions.length === 0) return base;
      return {
        ...base,
        outcomes: [...base.outcomes, ...additions.map((a) => a.outcome)],
      };
    }),
    ...(anomaly.additionalAbilities ?? []),
  ];
  const personalizationCards = (anomaly.outcomeAdditions ?? [])
    .filter((a): a is OutcomeAddition & { personalization: NonNullable<OutcomeAddition['personalization']>; sourceCode: string } =>
      !!a.personalization && !!a.sourceCode
    )
    .map(a => ({
      key: a.sourceCode,
      name: unlockedDocs?.find(d => d.code === a.sourceCode)?.title ?? a.sourceCode,
      personalization: a.personalization,
    }));
  const [rollResults, setRollResults] = useState<Partial<Record<string, DiceRollResult>>>({});
  const [showTriscendence, setShowTriscendence] = useState(false);
  const [triscendenceAbility, setTriscendenceAbility] = useState<string | null>(null);
  const [showQASpend, setShowQASpend] = useState(false);
  const [qaSpendAbility, setQASpendAbility] = useState<string | null>(null);
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
    let codeToEarn: string | undefined;
    if (answers[answerIndex].every(b => b)) {
      const abilityDef = allAbilities.find(a => a.name === abilityName);
      const personalCard = personalizationCards.find(c => c.key === abilityName);
      const prompt = abilityDef?.personalization ?? personalCard?.personalization;
      const answerCode = prompt?.answers[answerIndex].code;
      if (answerCode && !earnedCodes?.includes(answerCode)) {
        codeToEarn = answerCode;
      }
    }
    onUpdateAnomaly({
      ...anomaly,
      personalizationProgress: {
        ...anomaly.personalizationProgress,
        [abilityName]: { ...existing, answers },
      },
    }, codeToEarn);
  }

  return (
    <div className="anomaly-panel">
      {showQASpend && qaSpendAbility && rollResults[qaSpendAbility] && (() => {
        const spendAbility = allAbilities.find((a) => a.name === qaSpendAbility)!;
        const qa = qualityAssurances[spendAbility.rollStat];
        return (
          <QASpendModal
            abilityName={qaSpendAbility}
            rollStat={spendAbility.rollStat}
            qa={qa}
            originalResult={rollResults[qaSpendAbility]!}
            tieredMode={spendAbility.tieredMode}
            onAccept={(modifiedResult, spent) => {
              setRollResults((prev) => ({ ...prev, [qaSpendAbility]: modifiedResult }));
              if (spent > 0) {
                onUpdateQA({
                  ...qualityAssurances,
                  [spendAbility.rollStat]: { ...qa, current: qa.current - spent },
                });
              }
              setShowQASpend(false);
              setQASpendAbility(null);
            }}
          />
        );
      })()}
      {showTriscendence && triscendenceAbility && rollResults[triscendenceAbility] && (() => {
        const tAbility = allAbilities.find((a) => a.name === triscendenceAbility);
        return (
          <TriscendenceModal
            result={rollResults[triscendenceAbility]!}
            tieredMode={tAbility?.tieredMode}
            qualityAssurances={qualityAssurances}
            onApply={(updated) => {
              setRollResults((prev) => ({ ...prev, [triscendenceAbility]: updated }));
              setShowTriscendence(false);
            }}
            onApplyQA={(updated) => { onUpdateQA(updated); setShowTriscendence(false); }}
            onCommend={() => { onCommend(); setShowTriscendence(false); }}
            onDismiss={() => setShowTriscendence(false)}
          />
        );
      })()}
      <h2 className="anomaly-panel-title">{definition.name}</h2>
      <div className="ability-list">
        {allAbilities.map((ability) => {
          const progress = getProgress(ability.name);
          return (
            <div key={ability.name} className="ability-card">
              <div className="ability-header">
                {ability.personalization && (
                  <label className="ability-practiced-label">
                    <input
                      type="checkbox"
                      className="ability-practiced-checkbox"
                      checked={progress.practiced}
                      onChange={() => togglePracticed(ability.name)}
                    />
                    Practiced
                  </label>
                )}
                <h3 className="ability-name">{ability.name}</h3>
                <button
                  type="button"
                  className="ability-roll-stat"
                  onClick={() => {
                    const qa = qualityAssurances[ability.rollStat];
                    const effectiveBurnout = (qa.current === 0 || qa.max === 0) ? burnout + 1 : burnout;
                    const result = rollDicePool(effectiveBurnout, ability.tieredMode);
                    setRollResults((prev) => ({ ...prev, [ability.name]: result }));
                    if (result.triscendence) {
                      setShowTriscendence(true);
                      setTriscendenceAbility(ability.name);
                    } else if (qa.max > 0 && qa.current > 0) {
                      setShowQASpend(true);
                      setQASpendAbility(ability.name);
                    }
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
                        {getRollDetail(r, ability.tieredMode)}
                      </span>
                      <span className="roll-result-chaos">◈ {calcChaos(r)} chaos</span>
                    </div>
                  </div>
                );
              })()}

              {ability.personalization && (
                <div className="personalization-box">
                  <p className="personalization-question">{ability.personalization.question}</p>
                  {ability.personalization.answers.map((answer, answerIndex) => {
                    const checkboxes: AnswerCheckboxes = progress.answers[answerIndex as 0 | 1];
                    const allChecked = checkboxes.every(b => b);
                    return (
                      <div key={answerIndex} className={`personalization-answer${allChecked ? ' personalization-answer--complete' : ''}`}>
                        <span className="personalization-answer-text">{answer.text}</span>
                        <div className="personalization-checkboxes">
                          {checkboxes.map((checked, boxIndex) => (
                            <input
                              key={boxIndex}
                              type="checkbox"
                              checked={checked}
                              disabled={allChecked}
                              onChange={allChecked ? undefined : () => toggleCheckbox(ability.name, answerIndex as 0 | 1, boxIndex)}
                              className="personalization-checkbox"
                            />
                          ))}
                          <span className="personalization-code">{answer.code}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
        {personalizationCards.map((card) => {
          const progress = getProgress(card.key);
          return (
            <div key={card.key} className="ability-card">
              <div className="ability-header">
                <label className="ability-practiced-label">
                  <input
                    type="checkbox"
                    className="ability-practiced-checkbox"
                    checked={progress.practiced}
                    onChange={() => togglePracticed(card.key)}
                  />
                  Practiced
                </label>
                <h3 className="ability-name">{card.name}</h3>
              </div>
              <div className="personalization-box">
                <p className="personalization-question">{card.personalization.question}</p>
                {card.personalization.answers.map((answer, answerIndex) => {
                  const checkboxes = progress.answers[answerIndex as 0 | 1];
                  const allChecked = checkboxes.every(b => b);
                  return (
                    <div key={answerIndex} className={`personalization-answer${allChecked ? ' personalization-answer--complete' : ''}`}>
                      <span className="personalization-answer-text">{answer.text}</span>
                      <div className="personalization-checkboxes">
                        {checkboxes.map((checked, boxIndex) => (
                          <input
                            key={boxIndex}
                            type="checkbox"
                            checked={checked}
                            disabled={allChecked}
                            onChange={allChecked ? undefined : () => toggleCheckbox(card.key, answerIndex as 0 | 1, boxIndex)}
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
      {(unlockedDocs?.length ?? 0) > 0 && (
        <div className="unlocked-docs-section">
          <h4 className="unlocked-docs-heading">Unlocked Documents</h4>
          {unlockedDocs!.map(doc => (
            <DocumentCard
              key={doc.code}
              doc={doc}
              trackClass="wlb-track--anomaly"
              earnedCodes={earnedCodes ?? []}
              onGoto={onGoto}
            />
          ))}
        </div>
      )}
    </div>
  );
}
