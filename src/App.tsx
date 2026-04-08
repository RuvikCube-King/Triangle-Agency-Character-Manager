import { useState } from 'react';
import { useCharacters } from './hooks/useCharacters';
import { CharacterRoster } from './components/CharacterRoster';
import { CharacterSheet } from './components/CharacterSheet';
import { CharacterForm } from './components/CharacterForm';
import { Character } from './types/character';
import './App.css';

type View = 'roster' | 'sheet' | 'edit';

export function App() {
  const { characters, addCharacter, updateCharacter, deleteCharacter } = useCharacters();
  const [view, setView] = useState<View>('roster');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedCharacter = selectedId ? characters.find((c) => c.id === selectedId) ?? null : null;

  function handleView(id: string) {
    setSelectedId(id);
    setView('sheet');
  }

  function handleEdit(id: string) {
    setSelectedId(id);
    setView('edit');
  }

  function handleCreateNew() {
    const newChar = addCharacter();
    setSelectedId(newChar.id);
    setView('edit');
  }

  function handleDelete(id: string) {
    deleteCharacter(id);
    if (selectedId === id) {
      setSelectedId(null);
      setView('roster');
    }
  }

  function handleSave(updated: Character) {
    updateCharacter(updated);
    setView('sheet');
  }

  function handleBack() {
    setSelectedId(null);
    setView('roster');
  }

  return (
    <div className="app">
      {view === 'roster' && (
        <CharacterRoster
          characters={characters}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={handleCreateNew}
        />
      )}
      {view === 'sheet' && selectedCharacter && (
        <CharacterSheet
          character={selectedCharacter}
          onEdit={() => handleEdit(selectedCharacter.id)}
          onBack={handleBack}
          onUpdateCharacter={updateCharacter}
        />
      )}
      {view === 'edit' && selectedCharacter && (
        <CharacterForm
          character={selectedCharacter}
          onSave={handleSave}
          onCancel={() => setView(selectedCharacter.name ? 'sheet' : 'roster')}
        />
      )}
    </div>
  );
}
