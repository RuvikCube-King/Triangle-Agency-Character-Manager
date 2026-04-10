import { useState, useEffect } from 'react';
import { Character, createDefaultCharacter, createDefaultWorkLifeBalance } from '../types/character';

const STORAGE_KEY = 'ta-characters';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function migrateCharacter(c: any): Character {
  if (typeof c.competency === 'string') {
    c.competency = null;
  }
  delete c.primeDirective;
  delete c.sanctionedBehaviors;
  if (!c.workLifeBalance) {
    c.workLifeBalance = createDefaultWorkLifeBalance();
  }
  return c as Character;
}

function loadFromStorage(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Character[]).map(migrateCharacter) : [];
  } catch {
    return [];
  }
}

function saveToStorage(characters: Character[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
}

export function useCharacters() {
  const [characters, setCharacters] = useState<Character[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(characters);
  }, [characters]);

  function addCharacter(): Character {
    const newChar: Character = {
      id: crypto.randomUUID(),
      ...createDefaultCharacter(),
    };
    setCharacters((prev) => [...prev, newChar]);
    return newChar;
  }

  function updateCharacter(updated: Character): void {
    setCharacters((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
  }

  function deleteCharacter(id: string): void {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
  }

  return { characters, addCharacter, updateCharacter, deleteCharacter };
}
