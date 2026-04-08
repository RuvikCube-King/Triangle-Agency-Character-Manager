import { useState, useEffect } from 'react';
import { Character, createDefaultCharacter } from '../types/character';

const STORAGE_KEY = 'ta-characters';

function loadFromStorage(): Character[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Character[]) : [];
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
