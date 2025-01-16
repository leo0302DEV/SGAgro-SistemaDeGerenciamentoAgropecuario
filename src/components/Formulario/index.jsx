import styled from "styled-components";
import CampoTexto from "./FormularioComponents/CampoTexto";
import { useContext } from "react";
import CampoSelecao from "./FormularioComponents/CampoSelecao";
import CampoData from "./FormularioComponents/CampoData";
import CampoRadio from "./FormularioComponents/CampoRadio";
import { Button } from "@mui/material";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  padding: 0 1.5rem;
`;

const opcoesIdade = ["0-10", "11-20", "21-30", "31-36", "36+"];
const opcoesSexo = ["Macho", "Fêmea"];
const opcoesPrenhura = [
  {
    value: true,
    label: "Sim",
  },
  {
    value: false,
    label: "Não",
  },
];

const Formulario = ({ handleSubmit, context }) => {
  const {
    brinco,
    setBrinco,
    peso,
    setPeso,
    raca,
    setRaca,
    idade,
    setIdade,
    sexo,
    setSexo,
    dataCadastro,
    setDataCadastro,
    setPrenhura,
  } = useContext(context);

  return (
    <StyledForm>
      <CampoTexto
        label={"Brinco"}
        onChange={(e) => {
          setBrinco(e.target.value);
        }}
        value={brinco}
      />

      <CampoSelecao
        label={"Idade em mêses"}
        options={opcoesIdade}
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
      />

      <CampoTexto
        label={"Peso em Kg"}
        onChange={(e) => {
          setPeso(e.target.value);
        }}
        value={peso}
      />

      <CampoData
        label={"Data cadastro"}
        value={dataCadastro}
        onChange={(e) => {
          setDataCadastro(e.target.value);
        }}
      />

      <CampoSelecao
        label={"Sexo"}
        options={opcoesSexo}
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
      />

      <CampoTexto
        label={"Raça"}
        onChange={(e) => {
          setRaca(e.target.value);
        }}
        value={raca}
      />

      <CampoRadio
        label={"Prenhura"}
        options={opcoesPrenhura}
        onChange={(e) => {
          setPrenhura(e.target.value);
        }}
      />

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
          width: "30%",
          alignSelf: "center",
        }}
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Cadastrar
      </Button>
    </StyledForm>
  );
};

export default Formulario;
