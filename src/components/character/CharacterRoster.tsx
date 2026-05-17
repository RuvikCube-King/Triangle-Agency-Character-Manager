import './CharacterRoster.css';
import { useRef } from 'react';
import { Character } from '../../types/character';

interface Props {
  characters: Character[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreateNew: () => void;
  onImport: (data: unknown) => boolean;
}

function exportCharacter(char: Character) {
  const blob = new Blob([JSON.stringify(char, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${char.name || 'character'}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function CharacterRoster({ characters, onView, onEdit, onDelete, onCreateNew, onImport }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        const ok = onImport(data);
        if (!ok) alert('Invalid character file.');
      } catch {
        alert('Could not read file.');
      }
      e.target.value = '';
    };
    reader.readAsText(file);
  }

  return (
    <div className="roster">
      <div className="roster-header">
        <h1>Triangle Agency</h1>
        <div className="roster-header-actions">
          <button className="btn btn-secondary" onClick={() => fileInputRef.current?.click()}>
            Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button className="btn btn-primary" onClick={onCreateNew}>
            + New Character
          </button>
        </div>
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
                <button className="btn btn-secondary" onClick={() => exportCharacter(char)}>
                  Export
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
