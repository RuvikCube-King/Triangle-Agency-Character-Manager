import { PlaywalledDocument, DocumentSection } from '../types/playwalleddocument';

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
          <div className="doc-ability-roll">
            Roll <strong>{section.rollStat.charAt(0).toUpperCase() + section.rollStat.slice(1)}</strong>
          </div>
          <p>{section.setup}</p>
          {section.outcomes.map((o, i) => (
            <div key={i} className={`doc-outcome doc-outcome--${o.trigger}`}>
              <span className="doc-outcome-label">{o.triggerLabel}</span>
              <span>{o.description}</span>
              {o.options && <ul>{o.options.map((opt, j) => <li key={j}>{opt}</li>)}</ul>}
            </div>
          ))}
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
  return (
    <div className={`document-card${trackClass ? ` ${trackClass}` : ''}`}>
      <div className="document-card-header">
        <span className="document-code">{doc.code}</span>
        <h3 className="document-title">{doc.title}</h3>
      </div>
      <div className="document-body">
        {doc.sections.map((s, i) => (
          <Section key={i} section={s} onGoto={onGoto} earnedCodes={earnedCodes} />
        ))}
      </div>
    </div>
  );
}
