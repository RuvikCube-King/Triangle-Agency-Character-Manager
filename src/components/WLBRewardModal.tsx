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

type RelationshipSelection = { kind: 'base'; index: number } | { kind: 'friend'; index: number };

function RealityReward({
  character,
  onApply,
  onCancel,
}: {
  character: Character;
  onApply: (updated: Character) => void;
  onCancel: () => void;
}) {
  const baseRelationships = character.reality?.relationships ?? null;
  const newFriends = character.reality?.additionalRelationships ?? [];
  const [selected, setSelected] = useState<RelationshipSelection>({ kind: 'base', index: 0 });

  function handleApply() {
    if (!baseRelationships || !character.reality) return;

    const allRelationships = [...baseRelationships, ...newFriends];
    const networkedCount = allRelationships.filter((r) => r.connection === 9).length;
    const totalGain = 1 + networkedCount;

    if (selected.kind === 'base') {
      const updatedRelationships = baseRelationships.map((r, i) =>
        i === selected.index ? { ...r, connection: Math.min(9, r.connection + totalGain) } : r
      ) as typeof baseRelationships;
      onApply({ ...character, reality: { ...character.reality, relationships: updatedRelationships } });
    } else {
      const updatedFriends = newFriends.map((r, i) =>
        i === selected.index ? { ...r, connection: Math.min(9, r.connection + totalGain) } : r
      );
      onApply({ ...character, reality: { ...character.reality, additionalRelationships: updatedFriends } });
    }
  }

  if (!baseRelationships) {
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

  const allRelationships = [...baseRelationships, ...newFriends];
  const networkedCount = allRelationships.filter((r) => r.connection === 9).length;
  const isSelected = (sel: RelationshipSelection) =>
    sel.kind === selected.kind && sel.index === selected.index;

  return (
    <>
      <p className="wlb-reward-title wlb-reward-title--reality">Reality Reward</p>
      <p className="wlb-reward-subtitle">
        Choose a Relationship to increase Connection by {1 + networkedCount}
        {networkedCount > 0 && ` (1 + ${networkedCount} Networked bonus${networkedCount !== 1 ? 'es' : ''})`}.
      </p>

      <div className="wlb-reward-option-list">
        {baseRelationships.map((r, i) => (
          <button
            key={`base-${i}`}
            type="button"
            className={`wlb-reward-option-btn${isSelected({ kind: 'base', index: i }) ? ' selected' : ''}`}
            onClick={() => setSelected({ kind: 'base', index: i })}
          >
            <span>{r.name || `Relationship ${i + 1}`}</span>
            <span className="wlb-reward-option-meta">
              {r.connection}/9{r.connection === 9 ? ' ★' : ''}
            </span>
          </button>
        ))}
        {newFriends.map((r, i) => (
          <button
            key={`friend-${i}`}
            type="button"
            className={`wlb-reward-option-btn${isSelected({ kind: 'friend', index: i }) ? ' selected' : ''}`}
            onClick={() => setSelected({ kind: 'friend', index: i })}
          >
            <span>{r.name || `New Friend ${i + 1}`}</span>
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
