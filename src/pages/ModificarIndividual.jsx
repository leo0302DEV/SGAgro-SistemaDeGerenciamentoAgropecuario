import { useNavigate, useParams } from "react-router-dom";
import Formulario from "../components/Formulario/index";
import { ModificarIndividualFormContext } from "../providers/ModificarIndividualFormProvider";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import LoggingBanner from "../components/LoggingBanner";
import { MdDelete } from "react-icons/md";

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

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const StyledBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  margin-top: 1rem;
`;

const ModificarIndividual = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [logging, setLogging] = useState(true);

  const {
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
    validateForm,
    setRadioValue,
  } = useContext(ModificarIndividualFormContext);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/animals/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const animalData = data.animalRecord;

        setBrinco(animalData.earringId);
        setSexo(animalData.sex);
        setIdade(animalData.age);
        setRaca(animalData.race);
        setPeso(animalData.weight);
        setDataCadastro(animalData.registerDate);
        setPrenhura(animalData.pregnantState);
        setRadioValue(animalData.pregnantState);

        setLogging(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Erro ao atualizar animal!");
      });
  }, []);

  function updateAnimal(e) {
    e.preventDefault();

    if (!validateForm()) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/animals/${id}`, {
      method: "PUT",
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
      .then((data) => alert(data.message))
      .catch((error) => {
        alert("Erro ao atualizar cadastro!");
        console.log(error);
      });
  }

  function deletarRegistro() {
    if (confirm("Você deseja mesmo deletar esse registro?")) {
      fetch(`${import.meta.env.VITE_API_URL}/animals/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          navigate(-1);
        })
        .catch((error) => console.log(error));
    }

    return;
  }

  if (logging) {
    return <LoggingBanner />;
  }

  return (
    <StyledSection>
      <PageTitle>
        <StyledText onClick={() => navigate("/")}>Início</StyledText> - detalhes
      </PageTitle>

      <Formulario
        handleSubmit={updateAnimal}
        context={ModificarIndividualFormContext}
        buttonName={"Atualizar"}
      />

      <StyledBox>
        <Button
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "18px",
            borderRadius: "15px",
            width: "40%",
            alignSelf: "center",
          }}
          onClick={() =>
            navigate(`/modificarIndividual/${brinco}/${id}/medicamentos`)
          }
        >
          Medicamentos
        </Button>

        <Button
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "18px",
            borderRadius: "15px",
            width: "40%",
            alignSelf: "center",
          }}
          onClick={() => navigate(`/modificarIndividual/${brinco}/${id}/notas`)}
        >
          Notas
        </Button>
      </StyledBox>

      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
          width: "60%",
          alignSelf: "center",
          marginTop: ".9rem",
          borderColor: "red",
          color: "red",
        }}
        onClick={() => deletarRegistro()}
      >
        <MdDelete color="red" />
        Deletar animal
      </Button>
    </StyledSection>
  );
};

export default ModificarIndividual;
