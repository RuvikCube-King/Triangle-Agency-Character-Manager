// Static layout data for Work/Life Balance tracks.
// Box indices 0–14 = top row (left→right), 15–29 = bottom row (left→right internally,
// rendered right→left visually so the snake connects at the right edge).
// NOTE: Code positions are approximate and should be verified against the physical sheet.

import { TrackName } from '../types/workLifeBalance';
import { PLAYWALLED_DOCUMENTS } from './playwalleddocuments';

export interface WLBBoxMeta {
  code?: string;
}

export type TrackMeta = Partial<Record<number, WLBBoxMeta>>;

export const COMPETENCY_BOX_META: TrackMeta = {
   2: { code: 'A3' },
   5: { code: 'D4' },
   8: { code: 'G3' },
  11: { code: 'J3' },
  14: { code: 'N3' },
  17: { code: 'Y2' },
  20: { code: 'W8' },
  23: { code: 'T3' },
  26: { code: 'Q3' },
};

export const REALITY_BOX_META: TrackMeta = {
   0: { code: 'C4' },
   3: { code: 'L11' },
   7: { code: 'E2' },
   9: { code: 'O4' },
  13: { code: 'T6' },
  15: { code: 'E3' },
  19: { code: 'H5' },
  21: { code: 'X3' },
  25: { code: 'V2' },
};

export const ANOMALY_BOX_META: TrackMeta = {
   0: { code: 'C10' },
   1: { code: 'H3' },
   4: { code: 'U2' },
   6: { code: 'X2' },
  10: { code: 'N1' },
  12: { code: 'Q2' },
  16: { code: 'A7' },
  18: { code: 'G8' },
  22: { code: 'L10' },
};

export const TRACK_META: Record<string, TrackMeta> = {
  competency: COMPETENCY_BOX_META,
  reality: REALITY_BOX_META,
  anomaly: ANOMALY_BOX_META,
};

export function getCodeTrack(code: string): TrackName | null {
  for (const [track, meta] of Object.entries(TRACK_META)) {
    if (Object.values(meta).some((m) => m?.code === code)) {
      return track as TrackName;
    }
  }
  return PLAYWALLED_DOCUMENTS.find(d => d.code === code)?.track ?? null;
}

export interface RankSpan {
  label: string;
  // Visual slot indices within the row (0–14), left-to-right as rendered
  start: number;
  end: number; // inclusive
}

// Top row: left→right, TRAINEE through DIRECTOR
export const COMPETENCY_TOP_RANKS: RankSpan[] = [
  { label: 'TRAINEE',          start: 0,  end: 2  },
  { label: 'ASSOCIATE',        start: 3,  end: 5  },
  { label: 'SR. ASSOCIATE',    start: 6,  end: 8  },
  { label: 'ASST. DIRECTOR',   start: 9,  end: 11 },
  { label: 'DIRECTOR',         start: 12, end: 14 },
];

// Bottom row: rendered right→left visually, so slot 0 here = global index 29 (rightmost)
// Labels run: REGIONAL DIRECTOR (right) → CHAIR (left) as drawn on the sheet
export const COMPETENCY_BOTTOM_RANKS: RankSpan[] = [
  { label: 'REGIONAL DIRECTOR', start: 0,  end: 2  },
  { label: 'VICE PRESIDENT',    start: 3,  end: 5  },
  { label: 'SENIOR VP',         start: 6,  end: 8  },
  { label: 'EXECUTIVE VP',      start: 9,  end: 11 },
  { label: 'CHAIR',             start: 12, end: 14 },
];
