import './RequisitionsPanel.css';
import { Requisition } from '../types/character';

interface Props {
  requisitions: Requisition[];
  competencyName: string;
}

export function RequisitionsPanel({ requisitions, competencyName }: Props) {
  return (
    <div className="requisitions-panel">
      <div className="requisitions-panel-header">
        <div className="arc-stat arc-competency">
          <span className="arc-letter">C</span>
          <div>
            <span className="arc-stat-label">Competency</span>
            <span className="arc-stat-value">{competencyName || <em>—</em>}</span>
          </div>
        </div>
        <h2 className="requisitions-panel-title">Requisitions</h2>
      </div>

      {requisitions.length === 0 ? (
        <p className="requisitions-empty">No requisitions recorded.</p>
      ) : (
        <div className="requisitions-grid">
          {requisitions.map((req, i) => (
            <div key={i} className="requisition-card">
              <div className="requisition-card-header">
                <span className="requisition-name">{req.name || <em>Unnamed</em>}</span>
                <span className="requisition-divider" aria-hidden="true" />
                <span className="requisition-page-code">{req.pageCode}</span>
              </div>
              <div className="requisition-card-body">
                <span className="requisition-effect-label">Effect</span>
                <p className="requisition-effect-text">{req.effect || <em>—</em>}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
