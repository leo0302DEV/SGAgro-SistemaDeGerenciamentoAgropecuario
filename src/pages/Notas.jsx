import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import formatDate from "../utils/formatDate.js";
import { Button } from "@mui/material";
import { MdDelete } from "react-icons/md";
import LoggingBanner from "../components/LoggingBanner";

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

const Notas = () => {
  const { id, brinco } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [logging, setLogging] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNotes(data);
        setLogging(false);
      })
      .catch((error) => alert("Erro ao resgatar notas do animal."));
  }, []);

  function deletarNota(notaId) {
    if (confirm("Você deseja mesmo deletar essa nota?")) {
      fetch(`http://localhost:3000/notes/${notaId}`, {
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
                  deletarNota(Number(event.target.parentNode.dataset.id))
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
    </StyledSection>
  );
};

export default Notas;
