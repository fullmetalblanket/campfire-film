// GlobalStateContext.js
import React, { createContext, useContext, useReducer } from 'react';

const GlobalStateContext = createContext();

const initialState = {
  user: null,
  initialized: false,
};

function globalReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload}
    case 'SET_INITIALIZED':
      return { ...state, initialized: action.payload };
    default:
      return state;
  }
}

export function GlobalStateProvider({ children }) {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export function useGlobalState() {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
}