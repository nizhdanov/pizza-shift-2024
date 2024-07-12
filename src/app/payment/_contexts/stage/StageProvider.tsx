import React, { useMemo } from 'react';

import { type Stage, StageContext } from './StageContext';

export interface StageProviderProps {
  defaultStage?: Stage;
  children: React.ReactNode;
}

export const StageProvider: React.FC<StageProviderProps> = ({
  children,
  defaultStage = 'personDetails'
}) => {
  const [stage, setStage] = React.useState<Stage>(defaultStage);

  const value = useMemo(() => ({ stage, setStage }), [stage]);

  return <StageContext.Provider value={value}>{children}</StageContext.Provider>;
};
