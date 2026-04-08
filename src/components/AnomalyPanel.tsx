import { AnomalyDefinition } from '../types/anomaly';
import { AbilityProgress, AnswerCheckboxes, CharacterAnomaly } from '../types/character';

interface Props {
  anomaly: CharacterAnomaly;
  definition: AnomalyDefinition;
  onUpdateAnomaly: (updated: CharacterAnomaly) => void;
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

export function AnomalyPanel({ anomaly, definition, onUpdateAnomaly }: Props) {
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
                <span className="ability-roll-stat">Roll {ability.rollStat.charAt(0).toUpperCase() + ability.rollStat.slice(1)}</span>
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
