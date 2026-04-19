import { PlaywalledDocument, DocumentSection } from '../../types/playwalleddocument';
import { PLAYWALLED_DOCUMENTS } from '../../data/playwalleddocuments';

function Section({
  section,
  onGoto,
  earnedCodes,
}: {
  section: DocumentSection;
  onGoto?: (code: string) => void;
  earnedCodes: string[];
}) {
  switch (section.type) {
    case 'paragraphs':
      return (
        <div className="doc-section doc-paragraphs">
          {section.text.map((t, i) => <p key={i}>{t}</p>)}
        </div>
      );
    case 'list':
      return (
        <ul className="doc-section doc-list">
          {section.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'ability':
      return (
        <div className="doc-section doc-ability">
          {section.rollStat && (
            <div className="doc-ability-roll">
              Roll <strong>{section.rollStat.charAt(0).toUpperCase() + section.rollStat.slice(1)}</strong>
            </div>
          )}
          {section.setup && <p>{section.setup}</p>}
          {section.outcomes?.map((o, i) => (
            <div key={i} className={`doc-outcome doc-outcome--${o.trigger}`}>
              <span className="doc-outcome-label">{o.triggerLabel}</span>
              <span>{o.description}</span>
              {o.options && <ul>{o.options.map((opt, j) => <li key={j}>{opt}</li>)}</ul>}
            </div>
          ))}
          {section.personalization && (
            <div className="doc-personalization">
              <p className="doc-personalization-question">{section.personalization.question}</p>
              <div className="doc-personalization-answers">
                {section.personalization.answers.map((a, i) => (
                  <span key={i} className="doc-personalization-answer">{a.text}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    case 'outcome-addition':
      return (
        <div className="doc-section doc-outcome-addition">
          <p className="doc-outcome-addition-label">
            Add to <strong>{section.targetAbilityName}</strong>:
          </p>
          <div className={`doc-outcome doc-outcome--${section.outcome.trigger}`}>
            <span className="doc-outcome-label">{section.outcome.triggerLabel}</span>
            <span>{section.outcome.description}</span>
            {section.outcome.options && (
              <ul>{section.outcome.options.map((opt, j) => <li key={j}>{opt}</li>)}</ul>
            )}
          </div>
        </div>
      );
    case 'callout': {
      const isGoto = section.variant === 'goto' && section.gotoCode;
      const alreadyEarned = isGoto && earnedCodes.includes(section.gotoCode!);
      if (isGoto) {
        return (
          <button
            type="button"
            className={`doc-section doc-callout doc-callout--goto${alreadyEarned ? ' doc-callout--earned' : ''}`}
            onClick={() => onGoto?.(section.gotoCode!)}
            disabled={!!alreadyEarned}
          >
            {section.text}
          </button>
        );
      }
      return (
        <div className={`doc-section doc-callout doc-callout--${section.variant ?? 'default'}`}>
          {section.text}
        </div>
      );
    }
  }
}

interface Props {
  doc: PlaywalledDocument;
  trackClass?: string;
  earnedCodes: string[];
  onGoto?: (code: string) => void;
}

export function DocumentCard({ doc, trackClass, earnedCodes, onGoto }: Props) {
  const { unlockCondition } = doc;
  const isLocked =
    unlockCondition?.type === 'requires-documents' &&
    !unlockCondition.documentCodes.every(code => earnedCodes.includes(code));

  return (
    <div className={`document-card${isLocked ? ' document-card--locked' : ''}${trackClass ? ` ${trackClass}` : ''}`}>
      <div className="document-card-header">
        <span className="document-code">{doc.code}</span>
        <h3 className="document-title">{doc.title}</h3>
        {isLocked && <span className="document-lock-badge">Locked</span>}
      </div>
      {isLocked && unlockCondition?.type === 'requires-documents' ? (
        <div className="document-prerequisites">
          <p className="document-prerequisites-label">Requires</p>
          <ul className="document-prerequisites-list">
            {unlockCondition.documentCodes.map(code => {
              const met = earnedCodes.includes(code);
              const title = PLAYWALLED_DOCUMENTS.find(d => d.code === code)?.title;
              return (
                <li key={code} className={`document-prerequisite document-prerequisite--${met ? 'met' : 'unmet'}`}>
                  <span className="document-prerequisite-check">{met ? '✓' : '✗'}</span>
                  <span className="document-prerequisite-code">{code}</span>
                  {title && <span className="document-prerequisite-title">{title}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="document-body">
          {doc.sections.map((s, i) => (
            <Section key={i} section={s} onGoto={onGoto} earnedCodes={earnedCodes} />
          ))}
        </div>
      )}
    </div>
  );
}
