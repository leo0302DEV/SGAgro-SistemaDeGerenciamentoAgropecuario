import { useEffect, useState } from "react";
import CampoSelecao from "../Formulario/FormularioComponents/CampoSelecao";
import { Button } from "@mui/material";
import CampoData from "../Formulario/FormularioComponents/CampoData";
import styled from "styled-components";
import NovoRegistroForm from "./VacinasFormularioComponents/NovoRegistroForm";

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

const StyledForm = styled.form`
  padding: 1.5rem 1.5rem 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 1.5rem;
`;

const VacinasFormulario = ({ animalId }) => {
  const [vacinas, setVacinas] = useState([]);
  const [vacinaSelecionada, setVacinaSelecionada] = useState();
  const [dataAplicacao, setDataAplicacao] = useState("");
  const [click, setClick] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/vaccines")
      .then((response) => response.json())
      .then((data) => {
        const vacinasArr = data.map((vacina) => ({
          nome: vacina.name,
          idValue: vacina.id,
        }));

        setVacinaSelecionada(vacinasArr[0].idValue);
        setVacinas(vacinasArr);
      });
  }, []);

  function cadastrarNovaAplicacao() {
    fetch("http://localhost:3000/animalVaccines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationDate: dataAplicacao,
        AnimalId: Number(animalId),
        VaccineId: Number(vacinaSelecionada),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao cadastrar nova aplicação.");
      });
  }

  return (
    <StyledForm>
      <StyledFormTitle>Cadastrar nova aplicação</StyledFormTitle>

      <CampoSelecao
        label={"Selecione o medicamento"}
        options={[...vacinas]}
        onChange={(e) =>
          setVacinaSelecionada(e.target.selectedOptions[0].dataset.id)
        }
      />

      <CampoData
        label={"Data da aplicação"}
        onChange={(e) => setDataAplicacao(e.target.value)}
        value={dataAplicacao}
      />

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={() => cadastrarNovaAplicacao()}
      >
        Cadastrar
      </Button>

      {click % 2 !== 0 ? <NovoRegistroForm /> : null}

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={() => setClick((value) => value + 1)}
      >
        {click % 2 !== 0 ? "Ocultar" : "Exibir"} formulário de criação de novo
        medicamento
      </Button>
    </StyledForm>
  );
};

export default VacinasFormulario;
