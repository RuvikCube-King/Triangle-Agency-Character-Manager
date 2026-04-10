import './Documents.css';
import { useState } from 'react';
import { Character } from '../types/character';
import { PLAYWALLED_DOCUMENTS } from '../data/playwalleddocuments';
import { getCodeTrack } from '../data/workLifeBalance';
import { DocumentCard } from './DocumentCard';
import { TrackName } from '../types/workLifeBalance';

interface Props {
  character: Character;
  onGoto: (code: string) => void;
  onAcknowledgeA1: () => void;
}

const TRACK_ORDER: TrackName[] = ['competency', 'reality', 'anomaly'];
const TRACK_LABELS: Record<TrackName, string> = {
  competency: 'Competency',
  reality: 'Reality',
  anomaly: 'Anomaly',
};

export function DocumentsPanel({ character, onGoto, onAcknowledgeA1 }: Props) {
  const [showA1Modal, setShowA1Modal] = useState(false);
  const earned = character.workLifeBalance.earnedCodes;
  const unlocked = PLAYWALLED_DOCUMENTS.filter(d => earned.includes(d.code));

  if (unlocked.length === 0) {
    const showA1Button = earned.length === 0 && !earned.includes('A1');
    return (
      <div className="documents-empty">
        {showA1Modal && (
          <div className="a1-modal-overlay">
            <div className="a1-modal" onClick={(e) => e.stopPropagation()}>
              <div className="a1-modal-header">We told you you don't have access!</div>
              <div className="a1-modal-body">
                You have received 3 demerits and your PM has been notified.
              </div>
              <button
                type="button"
                className="btn a1-modal-acknowledge"
                onClick={() => { onAcknowledgeA1(); setShowA1Modal(false); }}
              >
                Acknowledge
              </button>
            </div>
          </div>
        )}
        <p>You do not have access to view any documents.</p>
        {showA1Button && (
          <button
            type="button"
            className="a1-easter-egg-btn"
            onClick={() => setShowA1Modal(true)}
          >
            A1
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="documents-panel">
      {TRACK_ORDER.map(track => {
        const docs = unlocked.filter(d => getCodeTrack(d.code) === track);
        if (docs.length === 0) return null;
        return (
          <section key={track} className={`documents-track-group wlb-track--${track}`}>
            <h4 className="documents-track-label">{TRACK_LABELS[track]}</h4>
            {docs.map(doc => (
              <DocumentCard
                key={doc.code}
                doc={doc}
                trackClass={`wlb-track--${track}`}
                earnedCodes={earned}
                onGoto={onGoto}
              />
            ))}
          </section>
        );
      })}
    </div>
  );
}
