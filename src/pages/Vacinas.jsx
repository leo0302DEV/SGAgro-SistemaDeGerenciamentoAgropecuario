import { IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import LoggingBanner from "../components/LoggingBanner";
import styled from "styled-components";
import formatDate from "../utils/formatDate.js";
import VacinasFormulario from "../components/VacinasFormulario/index.jsx";

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

const TableTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 1rem;
`;

const Vacinas = () => {
  const { id, brinco } = useParams();
  const [rows, setRows] = useState([]);
  const [logging, setLogging] = useState(true);
  const navigate = useNavigate();

  const columns = [
    { field: "nome", headerName: "Nome", width: 250 },
    {
      field: "dataAplicacao",
      headerName: "Data de aplicação",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Excluir",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton color="red" onClick={() => handleDelete(params)}>
          <MdDelete color="red" />
        </IconButton>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    fetch(`http://localhost:3000/animalVaccines/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const vacinas = data.map((vacina) => ({
          id: vacina.id,
          nome: vacina.Vaccine.name,
          dataAplicacao: formatDate(vacina.applicationDate),
        }));

        setRows(vacinas);
        setLogging(false);
      })
      .catch((error) => {
        alert(
          "Parece que esse animal ainda não tem registros de vacinação no banco."
        );
        console.log(error);
      });
  }, []);

  function handleDelete(params) {
    if (confirm("Você deseja mesmo excluir esse registro?")) {
      fetch(`http://localhost:3000/animalVaccines/${params.row.id}`, {
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
        .catch((error) => {
          alert("Erro ao deletar informações sobre essa vacina do animal.");
          console.log(error);
        });
    }

    return;
  }

  if (logging) {
    <LoggingBanner />;
  }

  return (
    <StyledSection>
      <PageTitle>
        Início - <StyledText onClick={() => navigate(-1)}>detalhes</StyledText>{" "}
        - vacinas
      </PageTitle>

      <TableTitle>Vacinas do animal ({brinco})</TableTitle>

      <Paper sx={{ height: 400, width: "97%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick={true}
          sx={{ border: 0 }}
        />
      </Paper>

      <VacinasFormulario animalId={id} />
    </StyledSection>
  );
};

export default Vacinas;
