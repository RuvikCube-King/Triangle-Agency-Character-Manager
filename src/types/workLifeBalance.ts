export type BoxState = 'empty' | 'marked' | 'struck';
export type TrackName = 'competency' | 'reality' | 'anomaly';

export interface WLBTrackState {
  boxes: BoxState[]; // always exactly 30 entries, index 0–29
}

export interface WorkLifeBalance {
  competency: WLBTrackState;
  reality: WLBTrackState;
  anomaly: WLBTrackState;
  earnedCodes: string[];
  mvpCount: number;
  probationCount: number;
}
