import './WorkLifeBalance.css';
import { useState } from 'react';
import { Character, OutcomeAddition } from '../types/character';
import { TrackName, BoxState } from '../types/workLifeBalance';
import { AnomalyDefinition } from '../types/anomaly';
import { TRACK_META } from '../data/workLifeBalance';
import { PLAYWALLED_DOCUMENTS } from '../data/playwalleddocuments';
import { AbilityDefinition } from '../types/anomaly';
import { DocumentSection } from '../types/playwalleddocument';
import { WLBTrack } from './WLBTrack';
import { WLBRewardModal } from './WLBRewardModal';

interface Props {
  character: Character;
  anomalyDefinition: AnomalyDefinition | null;
  onUpdateCharacter: (updated: Character) => void;
  onBack: () => void;
}

const TRACKS: TrackName[] = ['competency', 'reality', 'anomaly'];
const OTHER_TRACKS: Record<TrackName, TrackName[]> = {
  competency: ['reality', 'anomaly'],
  reality:    ['competency', 'anomaly'],
  anomaly:    ['competency', 'reality'],
};

function firstEmptyIndex(boxes: BoxState[]): number {
  return boxes.findIndex((b) => b === 'empty');
}

function lastEmptyIndex(boxes: BoxState[]): number {
  for (let i = boxes.length - 1; i >= 0; i--) {
    if (boxes[i] === 'empty') return i;
  }
  return -1;
}

export function WorkLifeBalancePage({ character, anomalyDefinition, onUpdateCharacter, onBack }: Props) {
  const [pendingReward, setPendingReward] = useState<{
    rewardType: TrackName;
  } | null>(null);

  const wlb = character.workLifeBalance;

  function applyMarkBox(
    track: TrackName,
    globalIndex: number,
    skipStrikes: boolean,
    baseCharacter: Character,
  ): Character {
    const newWLB = {
      ...baseCharacter.workLifeBalance,
      competency: { boxes: [...baseCharacter.workLifeBalance.competency.boxes] as BoxState[] },
      reality:    { boxes: [...baseCharacter.workLifeBalance.reality.boxes]    as BoxState[] },
      anomaly:    { boxes: [...baseCharacter.workLifeBalance.anomaly.boxes]    as BoxState[] },
      earnedCodes: [...baseCharacter.workLifeBalance.earnedCodes],
    };

    // Mark the chosen box
    newWLB[track].boxes[globalIndex] = 'marked';

    // Collect code if present; inject ability if the doc has an ability section
    const code = TRACK_META[track][globalIndex]?.code;
    let updatedAnomaly = baseCharacter.anomaly;
    if (code && !newWLB.earnedCodes.includes(code)) {
      newWLB.earnedCodes.push(code);
      const doc = PLAYWALLED_DOCUMENTS.find(d => d.code === code);
      const abilitySection = doc?.sections.find(s => s.type === 'ability');
      if (abilitySection && abilitySection.type === 'ability' && baseCharacter.anomaly) {
        const newAbility: AbilityDefinition = {
          name: doc!.title,
          description: abilitySection.setup,
          rollStat: abilitySection.rollStat,
          outcomes: abilitySection.outcomes,
        };
        const existing = baseCharacter.anomaly.additionalAbilities ?? [];
        if (!existing.some(a => a.name === newAbility.name)) {
          updatedAnomaly = {
            ...baseCharacter.anomaly,
            additionalAbilities: [...existing, newAbility],
          };
        }
      }

      const outcomeAddSections = doc?.sections.filter(s => s.type === 'outcome-addition') ?? [];
      if (outcomeAddSections.length > 0 && updatedAnomaly) {
        const existing = updatedAnomaly.outcomeAdditions ?? [];
        const newAdditions: OutcomeAddition[] = outcomeAddSections
          .filter((s): s is Extract<DocumentSection, { type: 'outcome-addition' }> => s.type === 'outcome-addition')
          .filter(s => !existing.some(e => e.targetAbilityName === s.targetAbilityName && e.outcome.trigger === s.outcome.trigger))
          .map(s => ({ targetAbilityName: s.targetAbilityName, outcome: s.outcome, personalization: s.personalization }));
        if (newAdditions.length > 0) {
          updatedAnomaly = { ...updatedAnomaly, outcomeAdditions: [...existing, ...newAdditions] };
        }
      }
    }

    // Strike last empty box in each other track (unless MVP/Probation bonus)
    if (!skipStrikes) {
      for (const other of OTHER_TRACKS[track]) {
        const idx = lastEmptyIndex(newWLB[other].boxes as BoxState[]);
        if (idx !== -1) {
          newWLB[other].boxes[idx] = 'struck';
        }
      }
    }

    return { ...baseCharacter, anomaly: updatedAnomaly, workLifeBalance: { ...newWLB } as typeof baseCharacter.workLifeBalance };
  }

  function handleMarkBox(track: TrackName, globalIndex: number, skipStrikes = false) {
    const updated = applyMarkBox(track, globalIndex, skipStrikes, character);
    onUpdateCharacter(updated);
    setPendingReward({ rewardType: track });
  }

  function handleMVP() {
    const idx = firstEmptyIndex(wlb.competency.boxes as BoxState[]);
    if (idx === -1) return;
    const updated = applyMarkBox('competency', idx, true, {
      ...character,
      workLifeBalance: {
        ...wlb,
        mvpCount: wlb.mvpCount + 1,
      },
    });
    onUpdateCharacter(updated);
    setPendingReward({ rewardType: 'competency' });
  }

  function handleProbation() {
    const idx = firstEmptyIndex(wlb.anomaly.boxes as BoxState[]);
    if (idx === -1) return;
    const updated = applyMarkBox('anomaly', idx, true, {
      ...character,
      workLifeBalance: {
        ...wlb,
        probationCount: wlb.probationCount + 1,
      },
    });
    onUpdateCharacter(updated);
    setPendingReward({ rewardType: 'anomaly' });
  }

  function handleNeither() {
    // Opens the Reality reward modal (connection bonus) without marking a box
    setPendingReward({ rewardType: 'reality' });
  }

  function handleRewardApply(updatedCharacter: Character) {
    onUpdateCharacter(updatedCharacter);
    setPendingReward(null);
  }

  return (
    <div className="wlb-page">
      {pendingReward && (
        <WLBRewardModal
          rewardType={pendingReward.rewardType}
          character={character}
          anomalyDefinition={anomalyDefinition}
          onApply={handleRewardApply}
          onCancel={() => setPendingReward(null)}
        />
      )}

      <div className="wlb-header">
        <button className="btn btn-secondary" onClick={onBack}>← Sheet</button>
        <h2 className="wlb-title">Work / Life Balance</h2>
      </div>

      <div className="wlb-award-row">
        <div className="wlb-award wlb-award--mvp">
          <div className="wlb-award-info">
            <span className="wlb-award-label">MVP</span>
            <span className="wlb-award-sub">Times Received</span>
          </div>
          <div className="counter-controls">
            <button
              className="counter-adj"
              onClick={() => onUpdateCharacter({ ...character, workLifeBalance: { ...wlb, mvpCount: Math.max(0, wlb.mvpCount - 1) } })}
              disabled={wlb.mvpCount === 0}
            >−</button>
            <span className="counter-value">{wlb.mvpCount}</span>
            <button className="counter-adj" onClick={handleMVP}>+</button>
          </div>
        </div>

        <div className="wlb-award wlb-award--probation">
          <div className="wlb-award-info">
            <span className="wlb-award-label">Probation</span>
            <span className="wlb-award-sub">Times Received</span>
          </div>
          <div className="counter-controls">
            <button
              className="counter-adj"
              onClick={() => onUpdateCharacter({ ...character, workLifeBalance: { ...wlb, probationCount: Math.max(0, wlb.probationCount - 1) } })}
              disabled={wlb.probationCount === 0}
            >−</button>
            <span className="counter-value">{wlb.probationCount}</span>
            <button className="counter-adj" onClick={handleProbation}>+</button>
          </div>
        </div>

        <div className="wlb-award wlb-award--neither">
          <div className="wlb-award-info">
            <span className="wlb-award-label">Neither</span>
            <span className="wlb-award-sub">+1 Connection bonus</span>
          </div>
          <button className="btn btn-secondary wlb-neither-btn" onClick={handleNeither}>
            Claim
          </button>
        </div>
      </div>

      <div className="wlb-rule-note">
        Mark 1 box per available time after each Mission. Marking a box strikes the last empty box from each other track.
      </div>

      <div className="wlb-tracks">
        {TRACKS.map((track) => (
          <WLBTrack
            key={track}
            trackName={track}
            trackState={wlb[track]}
            boxMeta={TRACK_META[track]}
            nextMarkableIndex={firstEmptyIndex(wlb[track].boxes as BoxState[])}
            onMarkBox={(idx) => handleMarkBox(track, idx)}
          />
        ))}
      </div>

      {wlb.earnedCodes.length > 0 && (
        <div className="wlb-earned-codes">
          <h3 className="wlb-earned-codes-title">Earned Codes</h3>
          <div className="wlb-earned-codes-list">
            {wlb.earnedCodes.map((code) => (
              <span key={code} className="wlb-earned-code">{code}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
