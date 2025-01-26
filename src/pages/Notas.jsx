import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import formatDate from "../utils/formatDate.js";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import LoggingBanner from "../components/LoggingBanner";
import CampoData from "../components/Formulario/FormularioComponents/CampoData";
import CampoTexto from "../components/Formulario/FormularioComponents/CampoTexto";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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

const TableTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 1rem;
`;

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 3rem;
  align-items: center;
  gap: 3rem;
`;

const StyledElementList = styled.li`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  border: 2px solid #528ce4;
  padding: 1.5rem;
  width: 100%;
  text-align: justify;
  border-radius: 10px;
`;

const StyledMessage = styled.p`
  margin: 6.5rem auto;
  text-align: center;
`;

const StyledForm = styled.form`
  width: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Notas = () => {
  const { id, brinco } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [logging, setLogging] = useState(true);
  const [novaNotaData, setNovaNotaData] = useState("");
  const [novaNota, setNovaNota] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        setLogging(false);
      })
      .catch((error) => alert("Erro ao resgatar notas do animal."));
  }, []);

  function deletarNota(notaId) {
    if (confirm("Você deseja mesmo deletar essa nota?")) {
      fetch(`${import.meta.env.VITE_API_URL}/notes/${notaId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          alert(data.message);
          location.reload();
        })
        .catch((error) => console.log(error));
    }

    return;
  }

  function criarNovaNota() {
    fetch(`${import.meta.env.VITE_API_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animalId: id,
        creationDate: novaNotaData,
        anotations: novaNota,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Erro ao cadastrar animal.");
      });
  }

  if (logging) {
    return <LoggingBanner />;
  }

  return (
    <StyledSection>
      <PageTitle>
        Início - <StyledText onClick={() => navigate(-1)}>detalhes</StyledText>{" "}
        - notas
      </PageTitle>

      <TableTitle>Notas do animal ({brinco})</TableTitle>

      <StyledList>
        {notes.length > 0 ? (
          notes.map((note) => (
            <StyledElementList key={note.id} data-id={note.id}>
              <span>{formatDate(note.creationDate)}</span>
              <p>{note.anotations}</p>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "16px",
                  borderRadius: "15px",
                  width: "40%",
                  alignSelf: "center",
                  borderColor: "red",
                  color: "red",
                  marginTop: "1rem",
                }}
                onClick={(event) =>
                  deletarNota(event.target.parentNode.dataset.id)
                }
              >
                <MdDelete color="red" />
                Deletar
              </Button>
            </StyledElementList>
          ))
        ) : (
          <StyledMessage>
            Parece que ainda não há notas para esse animal no banco.
          </StyledMessage>
        )}
      </StyledList>

      <StyledForm>
        <TableTitle>Adicione notas para esse animal</TableTitle>

        <CampoData
          label={"Data da anotação"}
          onChange={(e) => setNovaNotaData(e.target.value)}
          value={novaNotaData}
        />

        <CampoTexto
          label={"Anotação"}
          onChange={(e) => setNovaNota(e.target.value)}
          value={novaNota}
        />

        <Button
          variant="outlined"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "16px",
            borderRadius: "15px",
            width: "40%",
            alignSelf: "center",
          }}
          onClick={() => criarNovaNota()}
        >
          Postar
        </Button>
      </StyledForm>
    </StyledSection>
  );
};

export default Notas;
