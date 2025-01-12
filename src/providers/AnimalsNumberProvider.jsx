import { createContext, useState } from "react";

export const AnimalsNumberContext = createContext();

export const AnimalsNumberProvider = ({ children }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  return (
    <AnimalsNumberContext.Provider
      value={{
        selectedRows,
        setSelectedRows,
      }}
    >
      {children}
    </AnimalsNumberContext.Provider>
  );
};
