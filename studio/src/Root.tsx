import React from 'react';
import { Composition } from 'remotion';
import './engine/fonts';
import { STUDIO } from './studio.config';
import { EPISODES } from './episodes';
import {AaneDoWhatIfFrame} from './AaneDoWhatIfFrame';
import { CastSheet } from './CastSheet';

// Every episode gets two compositions: <Id> (the film) and <Id>Board (one frame per shot, at its key frame, for the
// storyboard). Cast renders the cast sheet.
//   npx remotion studio src/index.ts --port 3430

export const Root: React.FC = () => {
  const common = { width: STUDIO.width, height: STUDIO.height, fps: STUDIO.fps };
  return (
    <>
      {EPISODES.map((e) => (
        <React.Fragment key={e.id}>
          <Composition id={e.id} component={e.Main} durationInFrames={Math.max(1, e.total)} {...common} />
          <Composition id={`${e.id}Board`} component={e.Board} durationInFrames={Math.max(1, e.shotCount)} {...common} />
        </React.Fragment>
      ))}
      <Composition id="AaneDoWhatIfFrame" component={AaneDoWhatIfFrame} durationInFrames={1} fps={30} width={2560} height={1440}/>
      <Composition id="AaneDoClose" component={AaneDoWhatIfFrame} defaultProps={{view:'close' as const}} durationInFrames={1} fps={30} width={1920} height={1080}/>
      <Composition id="AaneDoDetail" component={AaneDoWhatIfFrame} defaultProps={{view:'detail' as const}} durationInFrames={1} fps={30} width={1920} height={1080}/>
      <Composition id="Cast" component={CastSheet} durationInFrames={1} {...common} />
    </>
  );
};
