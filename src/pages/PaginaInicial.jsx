import { IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { AnimalsNumberContext } from "../providers/AnimalsNumberProvider";
import ButtonsContainer from "../components/ButtonsContainer";
import formatDate from "../utils/formatDate.js";
import { useNavigate } from "react-router-dom";
import LoggingBanner from "../components/LoggingBanner.jsx";

const PageBody = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PageTitle = styled.h4`
  font-weight: 300;
  margin-bottom: 2rem;
`;

const TableTitle = styled.h2`
  font-size: 18px;
  margin-bottom: 1rem;
`;

const PaginaInicial = () => {
  const { setSelectedRows } = useContext(AnimalsNumberContext);
  const [rows, setRows] = useState([]);
  const [logging, setLogging] = useState(true);
  const navigate = useNavigate();

  const columns = [
    { field: "brinco", headerName: "Brinco", width: 120 },
    {
      field: "sexo",
      headerName: "Sexo",
      width: 120,
    },
    {
      field: "peso",
      headerName: "Peso (kg)",
      width: 150,
    },
    {
      field: "cadastro",
      headerName: "Data do cadastro",
      width: 180,
    },
    {
      field: "raca",
      headerName: "Raça",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Editar",
      width: 100,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton
          color="black"
          onClick={() => {
            navigate(`/modificarIndividual/${params.row.id}`);
          }}
        >
          <MdEdit />
        </IconButton>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  function handleSelection(data) {
    setSelectedRows(data);
  }

  useEffect(() => {
    fetch("http://localhost:3000/animals")
      .then((response) => response.json())
      .then((data) => {
        const animais = data.map((animal) => ({
          id: animal.id,
          brinco: animal.earringId,
          sexo: animal.sex,
          peso: animal.weight,
          cadastro: formatDate(animal.registerDate),
          raca: animal.race,
        }));
        setRows(animais);
        setLogging(false);
      });
  }, []);

  if (logging) {
    return <LoggingBanner />;
  }

  return (
    <PageBody>
      <PageTitle>Início</PageTitle>
      <TableTitle>Tabela de animais cadastrados</TableTitle>
      <Paper sx={{ height: 400, width: "97%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(data) => handleSelection(data)}
          disableRowSelectionOnClick={true}
          sx={{ border: 0 }}
        />
      </Paper>
      <ButtonsContainer />
    </PageBody>
  );
};

export default PaginaInicial;
