import { createContext, useState } from "react";

export const CadastroFormContext = createContext();

export const CadastroFormProvider = ({ children }) => {
  const [brinco, setBrinco] = useState("");
  const [sexo, setSexo] = useState("Fêmea");
  const [idade, setIdade] = useState("0-10");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [dataCadastro, setDataCadastro] = useState(null);
  const [prenhura, setPrenhura] = useState(false);

  return (
    <CadastroFormContext.Provider
      value={{
        brinco,
        setBrinco,
        sexo,
        setSexo,
        idade,
        setIdade,
        raca,
        setRaca,
        peso,
        setPeso,
        dataCadastro,
        setDataCadastro,
        prenhura,
        setPrenhura,
      }}
    >
      {children}
    </CadastroFormContext.Provider>
  );
};
