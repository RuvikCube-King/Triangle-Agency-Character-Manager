import { useState } from 'react';
import { Character, QA_KEYS, QAKey, createDefaultReality, Relationship } from '../types/character';
import { ANOMALY_DEFINITIONS } from '../data/anomalies';
import { REALITY_DEFINITIONS } from '../data/realities';

interface Props {
  character: Character;
  onSave: (character: Character) => void;
  onCancel: () => void;
}

export function CharacterForm({ character, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Character>(character);

  const selectedRealityDef = form.reality
    ? REALITY_DEFINITIONS.find((d) => d.id === form.reality!.realityId) ?? null
    : null;

  function setField<K extends keyof Character>(key: K, value: Character[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function setQA(key: QAKey, field: 'current' | 'max', value: number) {
    setForm((prev) => ({
      ...prev,
      qualityAssurances: {
        ...prev.qualityAssurances,
        [key]: { ...prev.qualityAssurances[key], [field]: Math.max(0, value) },
      },
    }));
  }

  function setSanctionedBehavior(index: 0 | 1 | 2, value: string) {
    const updated: [string, string, string] = [...form.sanctionedBehaviors] as [string, string, string];
    updated[index] = value;
    setField('sanctionedBehaviors', updated);
  }

  function handleCounter(key: 'commendations' | 'demerits' | 'additionalBurnout', delta: number) {
    setField(key, Math.max(0, form[key] + delta));
  }

  function setRelationship(index: 0 | 1 | 2, patch: Partial<Relationship>) {
    if (!form.reality) return;
    const updated: [Relationship, Relationship, Relationship] = [
      ...form.reality.relationships,
    ] as [Relationship, Relationship, Relationship];
    updated[index] = { ...updated[index], ...patch };
    setField('reality', { ...form.reality, relationships: updated });
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>{character.name ? `Edit: ${character.name}` : 'New Character'}</h1>
        <div className="form-header-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>Save</button>
        </div>
      </div>

      <div className="form-body">

        {/* Identity */}
        <section className="form-section">
          <h2>Identity</h2>
          <div className="form-grid">
            <label>
              Character Name
              <input
                type="text"
                value={form.name}
                onChange={(e) => setField('name', e.target.value)}
              />
            </label>
            <label>
              Pronouns
              <input
                type="text"
                value={form.pronouns}
                onChange={(e) => setField('pronouns', e.target.value)}
              />
            </label>
            <label>
              Agency Title
              <input
                type="text"
                value={form.agencyTitle}
                onChange={(e) => setField('agencyTitle', e.target.value)}
              />
            </label>
            <label>
              Agency Standing
              <input
                type="text"
                value={form.agencyStanding}
                onChange={(e) => setField('agencyStanding', e.target.value)}
              />
            </label>
          </div>
        </section>

        {/* ARC Stats */}
        <section className="form-section">
          <h2>ARC Stats</h2>
          <div className="form-grid">
            <label>
              Anomaly
              <select
                value={form.anomaly?.anomalyId ?? ''}
                onChange={(e) => {
                  const id = e.target.value;
                  setField('anomaly', id ? { anomalyId: id, personalizationProgress: {} } : null);
                }}
              >
                <option value="">— None —</option>
                {ANOMALY_DEFINITIONS.map((def) => (
                  <option key={def.id} value={def.id}>{def.name}</option>
                ))}
              </select>
            </label>
            <label>
              Reality
              <select
                value={form.reality?.realityId ?? ''}
                onChange={(e) => {
                  const id = e.target.value;
                  setField('reality', id ? createDefaultReality(id) : null);
                }}
              >
                <option value="">— None —</option>
                {REALITY_DEFINITIONS.map((def) => (
                  <option key={def.id} value={def.id}>{def.name}</option>
                ))}
              </select>
            </label>
            <label>
              Competency
              <input
                type="text"
                value={form.competency}
                onChange={(e) => setField('competency', e.target.value)}
              />
            </label>
          </div>
        </section>

        {/* Counters */}
        <section className="form-section">
          <h2>Counters</h2>
          <div className="form-grid counters-grid">
            {(['commendations', 'demerits', 'additionalBurnout'] as const).map((key) => (
              <label key={key}>
                {key === 'additionalBurnout' ? 'Additional Burnout' : key.charAt(0).toUpperCase() + key.slice(1)}
                <div className="counter-input">
                  <button type="button" onClick={() => handleCounter(key, -1)}>−</button>
                  <span>{form[key]}</span>
                  <button type="button" onClick={() => handleCounter(key, 1)}>+</button>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Mechanics */}
        <section className="form-section">
          <h2>Mechanics</h2>

          <label>
            Prime Directive
            <textarea
              rows={3}
              value={form.primeDirective}
              onChange={(e) => setField('primeDirective', e.target.value)}
            />
          </label>

          <div className="sanctioned-behaviors-field">
            <label className="sanctioned-behaviors-label">Sanctioned Behaviors</label>
            {([0, 1, 2] as const).map((i) => (
              <label key={i}>
                Behavior {i + 1}
                <input
                  type="text"
                  value={form.sanctionedBehaviors[i]}
                  onChange={(e) => setSanctionedBehavior(i, e.target.value)}
                />
              </label>
            ))}
          </div>
        </section>

        {/* Relationships (only when Reality is selected) */}
        {form.reality && selectedRealityDef && (
          <section className="form-section">
            <h2>Relationship Matrix</h2>
            {([0, 1, 2] as const).map((i) => {
              const rel = form.reality!.relationships[i];
              return (
                <div key={i} className="relationship-form-card">
                  <h3 className="relationship-question-label">
                    {selectedRealityDef.relationshipMatrixQuestions[i]}
                  </h3>
                  <div className="form-grid">
                    <label>
                      Name
                      <input
                        type="text"
                        value={rel.name}
                        onChange={(e) => setRelationship(i, { name: e.target.value })}
                      />
                    </label>
                    <label>
                      Played By
                      <input
                        type="text"
                        value={rel.playedBy}
                        onChange={(e) => setRelationship(i, { playedBy: e.target.value })}
                      />
                    </label>
                    <label>
                      Description
                      <input
                        type="text"
                        value={rel.description}
                        onChange={(e) => setRelationship(i, { description: e.target.value })}
                      />
                    </label>
                    <label>
                      Connection (0–9)
                      <input
                        type="number"
                        min={0}
                        max={9}
                        value={rel.connection}
                        onChange={(e) =>
                          setRelationship(i, {
                            connection: Math.min(9, Math.max(0, parseInt(e.target.value) || 0)),
                          })
                        }
                      />
                    </label>
                    <label>
                      Connection Bonus
                      <input
                        type="text"
                        value={rel.connectionBonus}
                        onChange={(e) => setRelationship(i, { connectionBonus: e.target.value })}
                      />
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={rel.active}
                        onChange={(e) => setRelationship(i, { active: e.target.checked })}
                      />
                      Active
                    </label>
                  </div>
                </div>
              );
            })}
          </section>
        )}

        {/* Quality Assurances */}
        <section className="form-section">
          <h2>Quality Assurances</h2>
          <div className="qa-grid">
            {QA_KEYS.map((key) => (
              <div key={key} className="qa-row">
                <span className="qa-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </span>
                <label className="qa-input-label">
                  Current
                  <input
                    type="number"
                    min={0}
                    value={form.qualityAssurances[key].current}
                    onChange={(e) => setQA(key, 'current', parseInt(e.target.value) || 0)}
                  />
                </label>
                <label className="qa-input-label">
                  Max
                  <input
                    type="number"
                    min={0}
                    value={form.qualityAssurances[key].max}
                    onChange={(e) => setQA(key, 'max', parseInt(e.target.value) || 0)}
                  />
                </label>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
