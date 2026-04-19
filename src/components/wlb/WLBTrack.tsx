import React from 'react';
import { BoxState, TrackName, WLBTrackState } from '../../types/workLifeBalance';
import {
  TrackMeta,
  COMPETENCY_TOP_RANKS,
  COMPETENCY_BOTTOM_RANKS,
} from '../../data/workLifeBalance';

interface Props {
  trackName: TrackName;
  trackState: WLBTrackState;
  boxMeta: TrackMeta;
  // index of the first 'empty' box (next markable); -1 if none
  nextMarkableIndex: number;
  onMarkBox: (globalIndex: number) => void;
}

function BoxCell({
  globalIndex,
  state,
  code,
  isNext,
  trackName,
  onMark,
}: {
  globalIndex: number;
  state: BoxState;
  code?: string;
  isNext: boolean;
  trackName: TrackName;
  onMark: () => void;
}) {
  const clickable = state === 'empty' && isNext;
  let cls = `wlb-box wlb-box--${state} wlb-track--${trackName}`;
  if (clickable) cls += ' wlb-box--clickable';

  return (
    <button
      type="button"
      className={cls}
      onClick={clickable ? onMark : undefined}
      disabled={!clickable}
      aria-label={
        state === 'struck' ? 'Struck box' :
        state === 'marked' ? `Marked${code ? `: ${code}` : ''}` :
        isNext ? 'Mark this box' : 'Empty box'
      }
    >
      {code ?? null}
    </button>
  );
}

function RankHeaderRow({ spans }: { spans: { label: string }[] }) {
  return (
    <div className="wlb-rank-row">
      {spans.map((span) => (
        <div key={span.label} className="wlb-rank-span">
          {span.label}
        </div>
      ))}
    </div>
  );
}

function Arrow({ dir }: { dir: '→' | '←' }) {
  return <span className="wlb-arrow" aria-hidden="true">{dir}</span>;
}

export function WLBTrack({ trackName, trackState, boxMeta, nextMarkableIndex, onMarkBox }: Props) {
  const topBoxes = trackState.boxes.slice(0, 15);   // indices 0–14
  const bottomBoxes = trackState.boxes.slice(15, 30); // indices 15–29, rendered right→left

  const showRanks = trackName === 'competency';

  return (
    <div className={`wlb-track wlb-track--${trackName}`}>
      <div className="wlb-track-label">
        {trackName.charAt(0).toUpperCase() + trackName.slice(1)}
      </div>

      <div className="wlb-track-scroll-area">
        {/* Top row — left→right */}
        {showRanks && <RankHeaderRow spans={COMPETENCY_TOP_RANKS} />}
        <div className="wlb-box-row">
          {topBoxes.map((state, rowIdx) => {
            const globalIndex = rowIdx;
            return (
              <React.Fragment key={globalIndex}>
                <BoxCell
                  globalIndex={globalIndex}
                  state={state}
                  code={boxMeta[globalIndex]?.code}
                  isNext={globalIndex === nextMarkableIndex}
                  trackName={trackName}
                  onMark={() => onMarkBox(globalIndex)}
                />
                {rowIdx < 14 && <Arrow dir="→" />}
              </React.Fragment>
            );
          })}
        </div>

        {/* Turn connector — down arrow on the right, bridging top row end to bottom row start */}
        <div className="wlb-turn-connector" aria-hidden="true">
          <span className="wlb-turn-arrow">↓</span>
        </div>

        {/* Bottom row — rendered right→left: global index 29 on the left, 15 on the right */}
        {showRanks && <RankHeaderRow spans={COMPETENCY_BOTTOM_RANKS} />}
        <div className="wlb-box-row">
          {[...bottomBoxes].reverse().map((state, reversedIdx) => {
            // reversedIdx 0 = global index 29, reversedIdx 14 = global index 15
            const globalIndex = 29 - reversedIdx;
            return (
              <React.Fragment key={globalIndex}>
                <BoxCell
                  globalIndex={globalIndex}
                  state={state}
                  code={boxMeta[globalIndex]?.code}
                  isNext={globalIndex === nextMarkableIndex}
                  trackName={trackName}
                  onMark={() => onMarkBox(globalIndex)}
                />
                {reversedIdx < 14 && <Arrow dir="←" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
