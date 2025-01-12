import { useContext } from "react";
import CadastroForm from "../components/CadastroForm";
import { CadastroFormContext } from "../providers/CadastroFromProvider";
import { Button } from "@mui/material";
import styled from "styled-components";

const StyledFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const Cadastro = () => {
  const { brinco, sexo, idade, raca, peso, dataCadastro, prenhura } =
    useContext(CadastroFormContext);

  function handleSubmit(event) {
    event.preventDefault();
    console.log({
      brinco,
      sexo,
      idade,
      raca,
      peso,
      dataCadastro,
      prenhura,
    });
  }

  return (
    <StyledFormSection>
      <CadastroForm />
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={(e) => handleSubmit(e)}
      >
        Cadastrar
      </Button>
    </StyledFormSection>
  );
};

export default Cadastro;
