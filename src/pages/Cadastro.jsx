import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { CadastroFormContext } from "../providers/CadastroFromProvider";
import Formulario from "../components/Formulario";

const StyledFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const PageTitle = styled.h4`
  font-weight: 300;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const StyledText = styled.p`
  cursor: pointer;
  text-decoration: underline;
`;

const Cadastro = () => {
  const {
    brinco,
    sexo,
    idade,
    raca,
    peso,
    dataCadastro,
    prenhura,
    resetForm,
    validateForm,
  } = useContext(CadastroFormContext);

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    fetch("http://localhost:3000/animals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        earringId: brinco,
        age: idade,
        weight: peso,
        registerDate: dataCadastro,
        sex: sexo,
        pregnantState: JSON.parse(prenhura),
        race: raca,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        resetForm();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao cadastrar animal.");
      });
  }

  return (
    <StyledFormSection>
      <PageTitle>
        <StyledText onClick={() => navigate("/")}>Início</StyledText> - cadastro
      </PageTitle>

      <Formulario
        handleSubmit={handleSubmit}
        context={CadastroFormContext}
        buttonName={"Cadastrar"}
      />
    </StyledFormSection>
  );
};

export default Cadastro;
