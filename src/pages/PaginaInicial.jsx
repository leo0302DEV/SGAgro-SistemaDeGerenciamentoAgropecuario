import { IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import styled from "styled-components";
import formatDate from "../utils/formatDate.js";
import { useNavigate } from "react-router-dom";
import LoggingBanner from "../components/LoggingBanner.jsx";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineLocalPrintshop } from "react-icons/md";
import { Button } from "@mui/material";

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
    {
      field: "print",
      headerName: "Imprimir ATA",
      width: 150,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton color="black" onClick={() => fetchATA(params)}>
          <MdOutlineLocalPrintshop />
        </IconButton>
      ),
    },
  ];
  const paginationModel = { page: 0, pageSize: 10 };

  useEffect(() => {
    fetch("https://sgpec-server-side-app.onrender.com/animals")
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.status === 404) {
          alert(data.message);
          setLogging(false);
          return;
        }

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function fetchATA(params) {
    const id = params.row.id;

    navigate(`/ATA/${id}`);
  }

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
          sx={{ border: 0 }}
        />
      </Paper>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
          marginTop: "2.5rem",
        }}
        onClick={() => navigate("/cadastro")}
      >
        <FaPlus />
        Cadastrar
      </Button>
    </PageBody>
  );
};

export default PaginaInicial;
