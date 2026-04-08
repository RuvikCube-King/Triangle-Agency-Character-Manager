import { CharacterReality } from '../types/character';
import { RealityDefinition } from '../types/reality';

interface Props {
  reality: CharacterReality;
  definition: RealityDefinition;
  onUpdateReality: (updated: CharacterReality) => void;
}

export function RealityPanel({ reality, definition, onUpdateReality }: Props) {
  function handleRealityTrackBox(index: number) {
    const updated: [boolean, boolean, boolean, boolean] = [...reality.realityTriggerBoxes] as [boolean, boolean, boolean, boolean];
    updated[index] = !updated[index];
    onUpdateReality({ ...reality, realityTriggerBoxes: updated });
  }

  function handleBurnoutToggle() {
    onUpdateReality({
      ...reality,
      burnoutRelease: { activated: !reality.burnoutRelease.activated },
    });
  }

  function handleConnectionPip(relIndex: 0 | 1 | 2, pipIndex: number) {
    const current = reality.relationships[relIndex].connection;
    const newConnection = pipIndex + 1 === current ? pipIndex : pipIndex + 1;
    const updated: [import('../types/character').Relationship, import('../types/character').Relationship, import('../types/character').Relationship] = [
      ...reality.relationships,
    ] as [import('../types/character').Relationship, import('../types/character').Relationship, import('../types/character').Relationship];
    updated[relIndex] = { ...updated[relIndex], connection: newConnection };
    onUpdateReality({ ...reality, relationships: updated });
  }

  function handleActiveToggle(relIndex: 0 | 1 | 2) {
    const updated: [import('../types/character').Relationship, import('../types/character').Relationship, import('../types/character').Relationship] = [
      ...reality.relationships,
    ] as [import('../types/character').Relationship, import('../types/character').Relationship, import('../types/character').Relationship];
    updated[relIndex] = { ...updated[relIndex], active: !updated[relIndex].active };
    onUpdateReality({ ...reality, relationships: updated });
  }

  return (
    <div className="reality-panel">
      <h2 className="reality-panel-title">{definition.name}</h2>

      <div className="reality-mechanics">
        {/* Reality Trigger */}
        <div className="reality-mechanic-block">
          <h3>{definition.realityTrigger.name}</h3>
          <p>{definition.realityTrigger.description}</p>
          {definition.hasRealityTrack && (
            <div className="reality-track">
              {reality.realityTriggerBoxes.map((filled, i) => (
                <button
                  key={i}
                  className={`reality-track-box ${filled ? 'filled' : ''}`}
                  onClick={() => handleRealityTrackBox(i)}
                  aria-label={`Reality track box ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Burnout Release */}
        <div className="reality-mechanic-block">
          <h3>{definition.burnoutRelease.name}</h3>
          <p>{definition.burnoutRelease.description}</p>
          <button
            className={`burnout-badge ${reality.burnoutRelease.activated ? 'activated' : 'inactive'}`}
            onClick={handleBurnoutToggle}
          >
            {reality.burnoutRelease.activated ? 'Activated' : 'Not Activated'}
          </button>
        </div>
      </div>

      {/* Relationship Matrix */}
      <h3 className="relationship-matrix-heading">Relationship Matrix</h3>
      <div className="relationship-grid">
        {reality.relationships.map((rel, i) => (
          <div key={i} className="relationship-card">
            <p className="relationship-question-label">
              {definition.relationshipMatrixQuestions[i]}
            </p>

            {rel.name && (
              <div className="relationship-identity">
                <span className="relationship-name">{rel.name}</span>
                {rel.playedBy && (
                  <span className="relationship-played-by">played by {rel.playedBy}</span>
                )}
              </div>
            )}
            {rel.description && (
              <p className="relationship-description">{rel.description}</p>
            )}

            <div className="connection-track">
              {Array.from({ length: 9 }, (_, pipIndex) => (
                <button
                  key={pipIndex}
                  className={`connection-pip ${pipIndex < rel.connection ? 'filled' : ''} ${pipIndex === 9 ? 'networked' : ''}`}
                  onClick={() => handleConnectionPip(i as 0 | 1 | 2, pipIndex)}
                  aria-label={`Set connection to ${pipIndex + 1}`}
                />
              ))}
            </div>
            {rel.connection === 9 && (
              <span className="connection-networked-label">NETWORKED</span>
            )}

            {rel.connectionBonus && (
              <p className="relationship-bonus">
                <strong>Connection Bonus:</strong> {rel.connectionBonus}
              </p>
            )}

            <button
              className={`relationship-active-badge ${rel.active ? 'activated' : 'inactive'}`}
              onClick={() => handleActiveToggle(i as 0 | 1 | 2)}
            >
              {rel.active ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
