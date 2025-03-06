import React, { createContext, useState } from "react";

// Create a Context
export const GlobalStateContext = createContext();
export const GlobalStateProvider = ({ children }) => {
  const [state, setState] = useState({
    latLng: null,
    bufferArea: null,
  });

  return (
    <GlobalStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
