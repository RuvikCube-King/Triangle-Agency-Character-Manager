import { AnomalyDefinition } from '../types/anomaly';
import { AnswerCheckboxes, CharacterAnomaly } from '../types/character';

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
  function toggleCheckbox(abilityName: string, answerIndex: 0 | 1, boxIndex: number) {
    const existing = anomaly.personalizationProgress[abilityName];
    const defaultBoxes: AnswerCheckboxes = [false, false, false];
    const pair: [AnswerCheckboxes, AnswerCheckboxes] = existing
      ? [[...existing[0]] as AnswerCheckboxes, [...existing[1]] as AnswerCheckboxes]
      : [defaultBoxes, [...defaultBoxes] as AnswerCheckboxes];
    pair[answerIndex][boxIndex] = !pair[answerIndex][boxIndex];
    onUpdateAnomaly({
      ...anomaly,
      personalizationProgress: {
        ...anomaly.personalizationProgress,
        [abilityName]: pair,
      },
    });
  }

  return (
    <div className="anomaly-panel">
      <h2 className="anomaly-panel-title">{definition.name}</h2>
      <div className="ability-list">
        {definition.abilities.map((ability) => {
          const progress = anomaly.personalizationProgress[ability.name];
          return (
            <div key={ability.name} className="ability-card">
              <div className="ability-header">
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
                  const checkboxes: AnswerCheckboxes = progress?.[answerIndex as 0 | 1] ?? [false, false, false];
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
