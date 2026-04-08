import { useState } from 'react';
import { Character, QA_KEYS, QAKey, CharacterAnomaly, CharacterReality } from '../types/character';
import { ANOMALY_DEFINITIONS } from '../data/anomalies';
import { REALITY_DEFINITIONS } from '../data/realities';
import { COMPETENCY_DEFINITIONS } from '../data/competencies';
import { AnomalyPanel } from './AnomalyPanel';
import { RealityPanel } from './RealityPanel';
import { RequisitionsPanel } from './RequisitionsPanel';

type Tab = 'overview' | 'anomaly' | 'relationships' | 'requisitions';

interface Props {
  character: Character;
  onEdit: () => void;
  onBack: () => void;
  onUpdateCharacter: (character: Character) => void;
}

export function CharacterSheet({ character, onEdit, onBack, onUpdateCharacter }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  const anomalyDefinition = character.anomaly
    ? ANOMALY_DEFINITIONS.find((d) => d.id === character.anomaly!.anomalyId) ?? null
    : null;

  const realityDefinition = character.reality
    ? REALITY_DEFINITIONS.find((d) => d.id === character.reality!.realityId) ?? null
    : null;

  const competencyDefinition = character.competency
    ? COMPETENCY_DEFINITIONS.find((d) => d.id === character.competency!.competencyId) ?? null
    : null;

  function handleUpdateAnomaly(updated: CharacterAnomaly) {
    onUpdateCharacter({ ...character, anomaly: updated });
  }

  function handleUpdateReality(updated: CharacterReality) {
    onUpdateCharacter({ ...character, reality: updated });
  }

  function handleCounter(key: 'commendations' | 'demerits' | 'additionalBurnout', delta: number) {
    onUpdateCharacter({ ...character, [key]: Math.max(0, character[key] + delta) });
  }

  function handlePipClick(key: QAKey, index: number) {
    const current = character.qualityAssurances[key].current;
    const newCurrent = index + 1 === current ? index : index + 1;
    onUpdateCharacter({
      ...character,
      qualityAssurances: {
        ...character.qualityAssurances,
        [key]: { ...character.qualityAssurances[key], current: newCurrent },
      },
    });
  }

  return (
    <div className="sheet-page">
      <div className="sheet-header">
        <button className="btn btn-secondary" onClick={onBack}>← Roster</button>
        <button className="btn btn-primary" onClick={onEdit}>Edit</button>
      </div>

      <div className="sheet-body">

        {/* Identity — always visible */}
        <section className="sheet-section sheet-identity">
          <h1 className="sheet-name">{character.name || <em>Unnamed Character</em>}</h1>
          {character.pronouns && <span className="sheet-pronouns">{character.pronouns}</span>}
          <div className="sheet-identity-fields">
            {character.agencyTitle && (
              <div className="sheet-field">
                <span className="sheet-field-label">Agency Title</span>
                <span className="sheet-field-value">{character.agencyTitle}</span>
              </div>
            )}
            {character.agencyStanding && (
              <div className="sheet-field">
                <span className="sheet-field-label">Agency Standing</span>
                <span className="sheet-field-value">{character.agencyStanding}</span>
              </div>
            )}
          </div>
        </section>

        {/* Tab navigation */}
        <div className="sheet-tabs">
          <button
            className={`sheet-tab${activeTab === 'overview' ? ' active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`sheet-tab sheet-tab-anomaly${activeTab === 'anomaly' ? ' active' : ''}`}
            onClick={() => setActiveTab('anomaly')}
          >
            Anomaly
          </button>
          <button
            className={`sheet-tab sheet-tab-reality${activeTab === 'relationships' ? ' active' : ''}`}
            onClick={() => setActiveTab('relationships')}
          >
            Relationships
          </button>
          <button
            className={`sheet-tab sheet-tab-competency${activeTab === 'requisitions' ? ' active' : ''}`}
            onClick={() => setActiveTab('requisitions')}
          >
            Requisitions
          </button>
        </div>

        {/* Overview tab */}
        {activeTab === 'overview' && (
          <div className="sheet-columns">
            <div className="sheet-left">

              {/* Counters */}
              <section className="sheet-section">
                <h2>Counters</h2>
                <div className="counters-display">
                  {([
                    ['commendations', 'Commendations'],
                    ['demerits', 'Demerits'],
                    ['additionalBurnout', 'Additional Burnout'],
                  ] as const).map(([key, label]) => (
                    <div key={key} className="counter-badge">
                      <div className="counter-controls">
                        <button className="counter-adj" onClick={() => handleCounter(key, -1)} disabled={character[key] === 0}>−</button>
                        <span className="counter-value">{character[key]}</span>
                        <button className="counter-adj" onClick={() => handleCounter(key, 1)}>+</button>
                      </div>
                      <span className="counter-label">{label}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Mechanics */}
              <section className="sheet-section">
                <h2>Mechanics</h2>

                <div className="mechanic-block">
                  <h3>Reality Trigger</h3>
                  {realityDefinition
                    ? <><strong>{realityDefinition.realityTrigger.name}</strong><p>{realityDefinition.realityTrigger.description}</p></>
                    : <p><em>Not set</em></p>
                  }
                </div>

                <div className="mechanic-block">
                  <h3>Burnout Release</h3>
                  {realityDefinition
                    ? <><strong>{realityDefinition.burnoutRelease.name}</strong><p>{realityDefinition.burnoutRelease.description}</p></>
                    : <p><em>Not set</em></p>
                  }
                </div>

                <div className="mechanic-block">
                  <h3>Prime Directive</h3>
                  {competencyDefinition
                    ? <p>{competencyDefinition.primeDirective}</p>
                    : <p><em>No competency selected</em></p>
                  }
                </div>

                <div className="mechanic-block">
                  <h3>Sanctioned Behaviors</h3>
                  {competencyDefinition
                    ? (
                      <ol className="sanctioned-list">
                        {competencyDefinition.sanctionedBehaviors.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ol>
                    )
                    : <p><em>No competency selected</em></p>
                  }
                </div>
              </section>

            </div>

            <div className="sheet-right">

              {/* ARC Stats */}
              <section className="sheet-section">
                <h2>ARC Stats</h2>
                <div className="arc-grid">
                  <div className="arc-stat arc-anomaly">
                    <span className="arc-letter">A</span>
                    <div>
                      <span className="arc-stat-label">Anomaly</span>
                      <span className="arc-stat-value">{anomalyDefinition?.name ?? '—'}</span>
                    </div>
                  </div>
                  <div className="arc-stat arc-reality">
                    <span className="arc-letter">R</span>
                    <div>
                      <span className="arc-stat-label">Reality</span>
                      <span className="arc-stat-value">{realityDefinition?.name ?? '—'}</span>
                    </div>
                  </div>
                  <div className="arc-stat arc-competency">
                    <span className="arc-letter">C</span>
                    <div>
                      <span className="arc-stat-label">Competency</span>
                      <span className="arc-stat-value">{competencyDefinition?.name ?? '—'}</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quality Assurances */}
              <section className="sheet-section">
                <h2>Quality Assurances</h2>
                <div className="qa-display">
                  {QA_KEYS.map((key) => {
                    const qa = character.qualityAssurances[key];
                    const pips = qa.max > 0 ? qa.max : 9;
                    return (
                      <div key={key} className="qa-display-row">
                        <span className="qa-display-label">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </span>
                        <div className="qa-pips">
                          {Array.from({ length: pips }, (_, i) => (
                            <button
                              key={i}
                              className={`qa-pip ${i < qa.current ? 'filled' : ''}`}
                              onClick={() => handlePipClick(key, i)}
                              aria-label={`Set ${key} to ${i + 1}`}
                            />
                          ))}
                        </div>
                        <span className="qa-fraction">{qa.current}/{qa.max || 9}</span>
                      </div>
                    );
                  })}
                </div>
              </section>

            </div>
          </div>
        )}

        {/* Anomaly tab */}
        {activeTab === 'anomaly' && (
          character.anomaly && anomalyDefinition
            ? (
              <AnomalyPanel
                anomaly={character.anomaly}
                definition={anomalyDefinition}
                onUpdateAnomaly={handleUpdateAnomaly}
              />
            )
            : (
              <div className="tab-empty-state">
                <p>No Anomaly selected. Edit the character to choose one.</p>
              </div>
            )
        )}

        {/* Relationships tab */}
        {activeTab === 'relationships' && (
          character.reality && realityDefinition
            ? (
              <RealityPanel
                reality={character.reality}
                definition={realityDefinition}
                onUpdateReality={handleUpdateReality}
              />
            )
            : (
              <div className="tab-empty-state">
                <p>No Reality selected. Edit the character to choose one.</p>
              </div>
            )
        )}

        {/* Requisitions tab */}
        {activeTab === 'requisitions' && (
          <RequisitionsPanel
            requisitions={character.requisitions ?? []}
            competencyName={competencyDefinition?.name ?? ''}
          />
        )}

      </div>
    </div>
  );
}
