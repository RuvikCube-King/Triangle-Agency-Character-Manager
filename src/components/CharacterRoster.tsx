import { Character } from '../types/character';

interface Props {
  characters: Character[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
}

export function CharacterRoster({ characters, onView, onEdit, onDelete, onCreateNew }: Props) {
  return (
    <div className="roster">
      <div className="roster-header">
        <h1>Triangle Agency</h1>
        <button className="btn btn-primary" onClick={onCreateNew}>
          + New Character
        </button>
      </div>

      {characters.length === 0 ? (
        <div className="roster-empty">
          <p>No characters yet. Create one to get started.</p>
        </div>
      ) : (
        <ul className="roster-list">
          {characters.map((char) => (
            <li key={char.id} className="roster-item">
              <div className="roster-item-info">
                <span className="roster-item-name">
                  {char.name || <em>Unnamed Character</em>}
                </span>
                {char.agencyTitle && (
                  <span className="roster-item-title">{char.agencyTitle}</span>
                )}
              </div>
              <div className="roster-item-actions">
                <button className="btn btn-secondary" onClick={() => onView(char.id)}>
                  View
                </button>
                <button className="btn btn-secondary" onClick={() => onEdit(char.id)}>
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (confirm(`Delete "${char.name || 'Unnamed Character'}"?`)) {
                      onDelete(char.id);
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
