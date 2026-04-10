import './CharacterForm.css';
import { useState } from 'react';
import { Character, QA_KEYS, QAKey, createDefaultReality, Relationship, Requisition, createDefaultRequisition, createDefaultCompetency } from '../types/character';
import { ANOMALY_DEFINITIONS } from '../data/anomalies';
import { REALITY_DEFINITIONS } from '../data/realities';
import { COMPETENCY_DEFINITIONS } from '../data/competencies';

interface Props {
  character: Character;
  onSave: (character: Character) => void;
  onCancel: () => void;
}

export function CharacterForm({ character, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Character>(character);
  const [selfAssessmentAnswers, setSelfAssessmentAnswers] = useState<(number | null)[]>([null, null, null]);

  const selectedRealityDef = form.reality
    ? REALITY_DEFINITIONS.find((d) => d.id === form.reality!.realityId) ?? null
    : null;

  const selectedCompetencyDef = form.competency
    ? COMPETENCY_DEFINITIONS.find((d) => d.id === form.competency!.competencyId) ?? null
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

  function handleCompetencyChange(newId: string) {
    const newDef = COMPETENCY_DEFINITIONS.find((d) => d.id === newId) ?? null;
    const strippedReqs = (form.requisitions ?? []).filter((r) => !r.fromCompetencyId);
    const newReqs: Requisition[] = newDef
      ? [
          {
            name: newDef.initialRequisition.name,
            pageCode: newDef.initialRequisition.pageCode,
            effect: newDef.initialRequisition.effect,
            fromCompetencyId: newDef.id,
          },
          ...strippedReqs,
        ]
      : strippedReqs;
    setForm((prev) => ({
      ...prev,
      competency: newId ? createDefaultCompetency(newId) : null,
      requisitions: newReqs,
    }));
    setSelfAssessmentAnswers([null, null, null]);
  }

  function handleCounter(key: 'commendations' | 'demerits' | 'additionalBurnout', delta: number) {
    setField(key, Math.max(0, form[key] + delta));
  }

  function setRequisition(index: number, patch: Partial<Requisition>) {
    const updated = [...(form.requisitions ?? [])];
    updated[index] = { ...updated[index], ...patch };
    setField('requisitions', updated);
  }

  function addRequisition() {
    setField('requisitions', [...(form.requisitions ?? []), createDefaultRequisition()]);
  }

  function removeRequisition(index: number) {
    const updated = [...(form.requisitions ?? [])];
    updated.splice(index, 1);
    setField('requisitions', updated);
  }

  function setRelationship(index: 0 | 1 | 2, patch: Partial<Relationship>) {
    if (!form.reality) return;
    const updated: [Relationship, Relationship, Relationship] = [
      ...form.reality.relationships,
    ] as [Relationship, Relationship, Relationship];
    updated[index] = { ...updated[index], ...patch };
    setField('reality', { ...form.reality, relationships: updated });
  }

  function handleSave() {
    let savedForm = { ...form };
    if (savedForm.competency && !savedForm.competency.selfAssessmentCompleted && selectedCompetencyDef) {
      const allAnswered = selfAssessmentAnswers.every((a) => a !== null);
      if (allAnswered) {
        const chosenKeys = new Set(
          selectedCompetencyDef.selfAssessment.map((q, qi) => q.options[selfAssessmentAnswers[qi]!].qaKey)
        );
        const updatedQA = { ...savedForm.qualityAssurances };
        QA_KEYS.forEach((key) => {
          const chosen = chosenKeys.has(key);
          updatedQA[key] = { ...updatedQA[key], current: chosen ? 3 : 0, max: chosen ? 3 : 0 };
        });
        savedForm = {
          ...savedForm,
          qualityAssurances: updatedQA,
          competency: { ...savedForm.competency, selfAssessmentCompleted: true },
        };
      }
    }
    onSave(savedForm);
  }

  return (
    <div className="form-page">
      <div className="form-header">
        <h1>{character.name ? `Edit: ${character.name}` : 'New Character'}</h1>
        <div className="form-header-actions">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          {selectedCompetencyDef && form.competency && !form.competency.selfAssessmentCompleted &&
            selfAssessmentAnswers.some((a) => a === null) && (
            <span className="self-assessment-warning">
              Answer all Self-Assessment questions to apply QA bonuses
            </span>
          )}
          <button className="btn btn-primary" onClick={handleSave}>Save</button>
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
              <select
                value={form.competency?.competencyId ?? ''}
                onChange={(e) => handleCompetencyChange(e.target.value)}
              >
                <option value="">— None —</option>
                {COMPETENCY_DEFINITIONS.map((def) => (
                  <option key={def.id} value={def.id}>{def.name}</option>
                ))}
              </select>
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

          <div className="mechanic-readonly-block">
            <span className="mechanic-readonly-label">Prime Directive</span>
            {selectedCompetencyDef
              ? <p className="mechanic-readonly-text">{selectedCompetencyDef.primeDirective}</p>
              : <p className="mechanic-readonly-empty"><em>Select a Competency above to see your Prime Directive.</em></p>
            }
          </div>

          <div className="mechanic-readonly-block">
            <span className="mechanic-readonly-label">Sanctioned Behaviors</span>
            {selectedCompetencyDef
              ? (
                <ol className="sanctioned-list">
                  {selectedCompetencyDef.sanctionedBehaviors.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ol>
              )
              : <p className="mechanic-readonly-empty"><em>Select a Competency above to see your Sanctioned Behaviors.</em></p>
            }
          </div>

          {selectedCompetencyDef && form.competency && !form.competency.selfAssessmentCompleted && (
            <div className="self-assessment-section">
              <h3 className="self-assessment-heading">Self-Assessment</h3>
              <p className="self-assessment-subheading">
                Answer all three questions. Each answer grants +3 to a Quality Assurance max and will be applied when you save.
              </p>
              {selectedCompetencyDef.selfAssessment.map((q, qIndex) => (
                <div key={qIndex} className="self-assessment-question">
                  <p className="self-assessment-question-text">
                    {qIndex + 1}. {q.question}
                  </p>
                  <div className="self-assessment-options">
                    {q.options.map((opt, oIndex) => (
                      <button
                        key={oIndex}
                        type="button"
                        className={`self-assessment-option-btn${selfAssessmentAnswers[qIndex] === oIndex ? ' selected' : ''}`}
                        onClick={() => {
                          const updated = [...selfAssessmentAnswers];
                          updated[qIndex] = selfAssessmentAnswers[qIndex] === oIndex ? null : oIndex;
                          setSelfAssessmentAnswers(updated);
                        }}
                      >
                        <span className="self-assessment-option-text">{opt.text}</span>
                        <span className="self-assessment-option-qa">+3 {opt.qaKey.charAt(0).toUpperCase() + opt.qaKey.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Requisitions */}
        <section className="form-section">
          <div className="requisitions-form-header">
            <h2>Requisitions</h2>
            <button type="button" className="btn btn-secondary requisitions-add-btn" onClick={addRequisition}>
              + Add Requisition
            </button>
          </div>

          {(form.requisitions ?? []).length === 0 && (
            <p className="requisitions-empty-hint">No requisitions yet. Click "Add Requisition" to begin.</p>
          )}

          {(form.requisitions ?? []).map((req, i) => (
            <div key={i} className="requisition-form-card">
              <div className="requisition-form-card-header">
                <span className="requisition-form-card-num">#{i + 1}</span>
                <button
                  type="button"
                  className="btn btn-danger requisition-remove-btn"
                  onClick={() => removeRequisition(i)}
                  aria-label={`Remove requisition ${i + 1}`}
                >
                  Remove
                </button>
              </div>
              <div className="form-grid">
                <label>
                  Name
                  <input
                    type="text"
                    value={req.name}
                    onChange={(e) => setRequisition(i, { name: e.target.value })}
                  />
                </label>
                <label>
                  Page / PD Code
                  <input
                    type="text"
                    value={req.pageCode}
                    onChange={(e) => setRequisition(i, { pageCode: e.target.value })}
                  />
                </label>
              </div>
              <label>
                Effect
                <textarea
                  rows={4}
                  value={req.effect}
                  onChange={(e) => setRequisition(i, { effect: e.target.value })}
                />
              </label>
            </div>
          ))}
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
      </div>
    </div>
  );
}
