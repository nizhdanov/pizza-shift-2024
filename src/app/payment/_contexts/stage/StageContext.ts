import React from 'react';

export type Stage = 'personDetails' | 'debitCard';

export interface StageContextProps {
  stage: Stage;
  setStage: (stage: Stage) => void;
}

export const StageContext = React.createContext<StageContextProps>({
  stage: 'personDetails',
  setStage: () => {}
});
