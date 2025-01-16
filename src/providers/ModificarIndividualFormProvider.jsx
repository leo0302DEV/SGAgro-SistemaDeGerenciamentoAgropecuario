import { createContext, useState } from "react";

export const ModificarIndividualFormContext = createContext();

export const ModificarIndividualFormProvider = ({ children }) => {
  const [brinco, setBrinco] = useState("");
  const [sexo, setSexo] = useState("Fêmea");
  const [idade, setIdade] = useState("0-10");
  const [raca, setRaca] = useState("");
  const [peso, setPeso] = useState("");
  const [dataCadastro, setDataCadastro] = useState("");
  const [prenhura, setPrenhura] = useState(false);
  const [radioValue, setRadioValue] = useState();

  function validateForm() {
    if (brinco === "" || raca === "" || peso === "" || dataCadastro === "") {
      return false;
    }

    return true;
  }

  return (
    <ModificarIndividualFormContext.Provider
      value={{
        radioValue,
        setRadioValue,
        validateForm,
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
    </ModificarIndividualFormContext.Provider>
  );
};
