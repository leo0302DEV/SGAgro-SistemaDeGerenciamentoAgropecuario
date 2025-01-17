import { useState } from "react";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import CampoTexto from "../../Formulario/FormularioComponents/CampoTexto";
import { Button } from "@mui/material";

const StyledContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;

  @media (min-width: 600px) {
    & {
      width: 90%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
      padding: 2rem;
    }
  }
`;

const StyledFormTitle = styled.h3`
  font-size: 18px;
  text-align: center;

  @media (min-width: 600px) {
    & {
      font-size: 20px;
      text-align: left;
    }
  }
`;

const NovoRegistroForm = () => {
  const [novoMedicamentoNome, setNovoMedicamentoNome] = useState("");
  const [novoMedicamentoAplic, setNovoMedicamentoAplic] = useState("");

  return (
    <StyledContainer>
      <StyledFormTitle>Criar novo medicamento no banco</StyledFormTitle>

      <CampoTexto
        label={"Nome do medicamento"}
        value={novoMedicamentoNome}
        onChange={(e) => setNovoMedicamentoNome(e.target.value)}
      />

      <CampoTexto
        label={"Indicacão de aplicação"}
        value={novoMedicamentoAplic}
        onChange={(e) => setNovoMedicamentoAplic(e.target.value)}
      />

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "2px",
          fontSize: "16px",
          borderRadius: "15px",
        }}
        onClick={() => {
          console.log(novoMedicamentoNome, novoMedicamentoAplic);
        }}
      >
        <FaPlus />
        Criar novo medicamento
      </Button>
    </StyledContainer>
  );
};

export default NovoRegistroForm;
