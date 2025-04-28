import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CursorState {
  isTargeted: boolean;
  targetRect: DOMRect | null;
}

interface CursorContextProps extends CursorState {
  setCursorState: (newState: Partial<CursorState>) => void;
}

const CursorContext = createContext<CursorContextProps | undefined>(undefined);

export const CursorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CursorState>({
    isTargeted: false,
    targetRect: null,
  });

  const setCursorState = (newState: Partial<CursorState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  return (
    <CursorContext.Provider value={{ ...state, setCursorState }}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = (): CursorContextProps => {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursor must be used within a CursorProvider');
  }
  return context;
};
