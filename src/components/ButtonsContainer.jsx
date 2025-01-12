import styled from "styled-components";
import { FaPlus } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { Button } from "@mui/material";
import { useContext } from "react";
import { AnimalsNumberContext } from "../providers/AnimalsNumberProvider";
import { useNavigate } from "react-router-dom";

const StyledButtonsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  align-self: flex-start;
`;

const ButtonsContainer = () => {
  const navigate = useNavigate();
  const { selectedRows } = useContext(AnimalsNumberContext);

  function handleModifyGrupClick() {
    if (selectedRows.length < 2) {
      alert("Selecione algum animal na tabela ou selecione mais de um!");
    } else {
      navigate("/modificarGrupo");
    }
  }

  return (
    <StyledButtonsContainer>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={() => navigate("/cadastro")}
      >
        <FaPlus />
        Cadastrar
      </Button>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={() => handleModifyGrupClick()}
      >
        <MdEdit />
        Modificar grupo
      </Button>
    </StyledButtonsContainer>
  );
};

export default ButtonsContainer;
