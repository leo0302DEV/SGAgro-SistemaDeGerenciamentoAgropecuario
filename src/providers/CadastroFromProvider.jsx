import { createContext, useState } from "react";

export const CadastroFormContext = createContext();

export const CadastroFormProvider = ({ children }) => {
  const [brinco, setBrinco] = useState("");
  const [sexo, setSexo] = useState("Fêmea");
  const [idade, setIdade] = useState("0-10");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [prenhura, setPrenhura] = useState(false);

  function resetForm() {
    setBrinco("");
    setSexo("Fêmea");
    setIdade("0-10");
    setRaca("");
    setPeso("");
    setDataCadastro("");
    setPrenhura(false);
  }

  function validateForm() {
    if (brinco === "" || raca === "" || peso === "" || dataCadastro === "") {
      return false;
    }

    return true;
  }

  return (
    <CadastroFormContext.Provider
      value={{
        validateForm,
        resetForm,
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
