import { IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { MdEdit } from "react-icons/md";
import { useContext } from "react";
import styled from "styled-components";
import { AnimalsNumberContext } from "../providers/AnimalsNumberProvider";
import ButtonsContainer from "../components/ButtonsContainer";

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

//Teste com a tabela:
const columns = [
  { field: "brinco", headerName: "Brinco", width: 120 },
  {
    field: "sexo",
    headerName: "Sexo",
    width: 120,
  },
  {
    field: "cadastro",
    headerName: "Data do cadastro",
    width: 180,
  },
  {
    field: "raca",
    headerName: "Raça",
    width: 250,
  },
  {
    field: "actions",
    headerName: "Editar",
    width: 100,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <IconButton color="black" onClick={() => console.log("olá mundo!")}>
        <MdEdit />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: 1,
    brinco: "024",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 2,
    brinco: "059",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 3,
    brinco: "023",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 4,
    brinco: "111",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 5,
    brinco: "231",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 6,
    brinco: "895",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Lino Vermelho (Cinza SRD)",
  },
  {
    id: 7,
    brinco: "245",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
  {
    id: 8,
    brinco: "254",
    sexo: "Fêmea",
    cadastro: "02/04/2025",
    raca: "Angus",
  },
];

const paginationModel = { page: 0, pageSize: 5 };

const PaginaInicial = () => {
  const { setSelectedRows } = useContext(AnimalsNumberContext);

  function handleSelection(data) {
    setSelectedRows(data);
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
