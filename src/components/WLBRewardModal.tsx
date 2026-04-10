import { useState } from 'react';
import { Character, QA_KEYS, QAKey } from '../types/character';
import { TrackName } from '../types/workLifeBalance';
import { AnomalyDefinition } from '../types/anomaly';

interface Props {
  rewardType: TrackName;
  character: Character;
  anomalyDefinition: AnomalyDefinition | null;
  onApply: (updatedCharacter: Character) => void;
  onCancel: () => void;
}

// ── Competency reward ────────────────────────────────────────────

function CompetencyReward({
  character,
  onApply,
  onCancel,
}: {
  character: Character;
  onApply: (updated: Character) => void;
  onCancel: () => void;
}) {
  const eligible = QA_KEYS.filter((k) => character.qualityAssurances[k].max < 9);
  const [selected, setSelected] = useState<QAKey | null>(eligible[0] ?? null);

  function handleApply() {
    let updated = { ...character, commendations: character.commendations + 3 };
    if (selected) {
      const qa = updated.qualityAssurances[selected];
      updated = {
        ...updated,
        qualityAssurances: {
          ...updated.qualityAssurances,
          [selected]: { ...qa, max: Math.min(9, qa.max + 1), current: Math.min(9, qa.max + 1) },
        },
      };
    }
    onApply(updated);
  }

  const label = (key: QAKey) => key.charAt(0).toUpperCase() + key.slice(1);

  return (
    <>
      <p className="wlb-reward-title wlb-reward-title--competency">Competency Reward</p>
      <p className="wlb-reward-subtitle">+3 Commendations. Choose a Quality Assurance to increase its maximum by 1.</p>

      {eligible.length === 0 ? (
        <p className="wlb-reward-note">All Quality Assurances are already at maximum.</p>
      ) : (
        <div className="wlb-reward-option-list">
          {eligible.map((key) => (
            <button
              key={key}
              type="button"
              className={`wlb-reward-option-btn${selected === key ? ' selected' : ''}`}
              onClick={() => setSelected(key)}
            >
              <span>{label(key)}</span>
              <span className="wlb-reward-option-meta">{character.qualityAssurances[key].max}/9</span>
            </button>
          ))}
        </div>
      )}

      <div className="wlb-reward-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleApply}
          disabled={eligible.length > 0 && selected === null}
        >
          Confirm
        </button>
      </div>
    </>
  );
}

// ── Reality reward ───────────────────────────────────────────────

function RealityReward({
  character,
  onApply,
  onCancel,
}: {
  character: Character;
  onApply: (updated: Character) => void;
  onCancel: () => void;
}) {
  const relationships = character.reality?.relationships ?? null;
  const [selected, setSelected] = useState<number>(0);

  function handleApply() {
    if (!relationships || !character.reality) return;

    // Count currently Networked (connection === 9) relationships
    const networkedCount = relationships.filter((r) => r.connection === 9).length;
    const totalGain = 1 + networkedCount;

    const updatedRelationships = relationships.map((r, i) =>
      i === selected
        ? { ...r, connection: Math.min(9, r.connection + totalGain) }
        : r
    ) as typeof relationships;

    onApply({
      ...character,
      reality: { ...character.reality, relationships: updatedRelationships },
    });
  }

  if (!relationships) {
    return (
      <>
        <p className="wlb-reward-title wlb-reward-title--reality">Reality Reward</p>
        <p className="wlb-reward-note">No Reality selected — no relationships available.</p>
        <div className="wlb-reward-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Dismiss</button>
        </div>
      </>
    );
  }

  const networkedCount = relationships.filter((r) => r.connection === 9).length;

  return (
    <>
      <p className="wlb-reward-title wlb-reward-title--reality">Reality Reward</p>
      <p className="wlb-reward-subtitle">
        Choose a Relationship to increase Connection by {1 + networkedCount}
        {networkedCount > 0 && ` (1 + ${networkedCount} Networked bonus${networkedCount !== 1 ? 'es' : ''})`}.
      </p>

      <div className="wlb-reward-option-list">
        {relationships.map((r, i) => (
          <button
            key={i}
            type="button"
            className={`wlb-reward-option-btn${selected === i ? ' selected' : ''}`}
            onClick={() => setSelected(i)}
          >
            <span>{r.name || `Relationship ${i + 1}`}</span>
            <span className="wlb-reward-option-meta">
              {r.connection}/9{r.connection === 9 ? ' ★' : ''}
            </span>
          </button>
        ))}
      </div>

      <div className="wlb-reward-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="button" className="btn btn-primary" onClick={handleApply}>Confirm</button>
      </div>
    </>
  );
}

// ── Anomaly reward ───────────────────────────────────────────────

type AnomalyChoice = 'practice' | 'be-known';

function AnomalyReward({
  character,
  anomalyDefinition,
  onApply,
  onCancel,
}: {
  character: Character;
  anomalyDefinition: AnomalyDefinition | null;
  onApply: (updated: Character) => void;
  onCancel: () => void;
}) {
  const abilities = anomalyDefinition?.abilities ?? [];
  const [choice, setChoice] = useState<AnomalyChoice>('practice');
  const [selectedAbility, setSelectedAbility] = useState<string | null>(abilities[0]?.name ?? null);

  function handleApply() {
    if (!character.anomaly || !selectedAbility) return;

    const existing = character.anomaly.personalizationProgress[selectedAbility] ?? {
      practiced: false,
      answers: [[false, false, false], [false, false, false]] as [[boolean, boolean, boolean], [boolean, boolean, boolean]],
    };

    const updatedProgress = {
      ...character.anomaly.personalizationProgress,
      [selectedAbility]: { ...existing, practiced: choice === 'practice' },
    };

    onApply({
      ...character,
      anomaly: { ...character.anomaly, personalizationProgress: updatedProgress },
    });
  }

  if (!anomalyDefinition || abilities.length === 0) {
    return (
      <>
        <p className="wlb-reward-title wlb-reward-title--anomaly">Anomaly Reward</p>
        <p className="wlb-reward-note">No Anomaly selected — no abilities available.</p>
        <div className="wlb-reward-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>Dismiss</button>
        </div>
      </>
    );
  }

  return (
    <>
      <p className="wlb-reward-title wlb-reward-title--anomaly">Anomaly Reward</p>

      <div className="wlb-reward-choice-row">
        <button
          type="button"
          className={`wlb-reward-choice-btn${choice === 'practice' ? ' selected' : ''}`}
          onClick={() => setChoice('practice')}
        >
          <strong>Practice</strong>
          <span>Mark Practiced on any ability</span>
        </button>
        <button
          type="button"
          className={`wlb-reward-choice-btn${choice === 'be-known' ? ' selected' : ''}`}
          onClick={() => setChoice('be-known')}
        >
          <strong>Be Known</strong>
          <span>Erase Practiced from an ability</span>
        </button>
      </div>

      <div className="wlb-reward-option-list">
        {abilities.map((a) => {
          const progress = character.anomaly?.personalizationProgress[a.name];
          const isPracticed = progress?.practiced ?? false;
          return (
            <button
              key={a.name}
              type="button"
              className={`wlb-reward-option-btn${selectedAbility === a.name ? ' selected' : ''}`}
              onClick={() => setSelectedAbility(a.name)}
            >
              <span>{a.name}</span>
              {isPracticed && <span className="wlb-reward-option-meta">Practiced</span>}
            </button>
          );
        })}
      </div>

      <div className="wlb-reward-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleApply}
          disabled={selectedAbility === null}
        >
          Confirm
        </button>
      </div>
    </>
  );
}

// ── Root modal ───────────────────────────────────────────────────

export function WLBRewardModal({ rewardType, character, anomalyDefinition, onApply, onCancel }: Props) {
  return (
    <div className="wlb-reward-overlay">
      <div className="wlb-reward-modal">
        {rewardType === 'competency' && (
          <CompetencyReward character={character} onApply={onApply} onCancel={onCancel} />
        )}
        {rewardType === 'reality' && (
          <RealityReward character={character} onApply={onApply} onCancel={onCancel} />
        )}
        {rewardType === 'anomaly' && (
          <AnomalyReward character={character} anomalyDefinition={anomalyDefinition} onApply={onApply} onCancel={onCancel} />
        )}
      </div>
    </div>
  );
}
