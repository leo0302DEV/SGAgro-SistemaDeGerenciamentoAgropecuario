import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "styled-components";
import { useContext } from "react";
import { CadastroFormContext } from "../providers/CadastroFromProvider";
import { formatDateString } from "../utils/formatDate";

const StyeledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 1.5rem;
`;

const StyledContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: 100%;
`;

const CadastroForm = () => {
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
    resetForm,
    validateForm,
  } = useContext(CadastroFormContext);

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
        registerDate: formatDateString(dataCadastro.$d),
        sex: sexo,
        pregnantState: prenhura,
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
    <StyledContainer>
      <StyeledForm>
        <TextField
          value={brinco}
          onChange={(e) => setBrinco(e.target.value)}
          label="Brinco"
          type="text"
          required
          autoFocus
        />

        <FormControl fullWidth required>
          <InputLabel>Idade em mêses</InputLabel>
          <Select
            value={idade}
            label="Idade em mêses"
            onChange={(e) => setIdade(e.target.value)}
          >
            <MenuItem value={"0-10"} defaultValue={true}>
              0-10
            </MenuItem>
            <MenuItem value={"11-20"}>11-20</MenuItem>
            <MenuItem value={"21-30"}>21-30</MenuItem>
            <MenuItem value={"31-36"}>31-36</MenuItem>
            <MenuItem value={"36+"}>36+</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          label="Peso em Kg"
          type="text"
          required
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Data cadastro"
            format="DD/MM/YYYY"
            value={dataCadastro}
            onChange={(value) => setDataCadastro(value)}
          />
        </LocalizationProvider>

        <FormControl fullWidth required>
          <InputLabel>Sexo</InputLabel>
          <Select
            value={sexo}
            label="Sexo"
            onChange={(e) => setSexo(e.target.value)}
          >
            <MenuItem value={"Fêmea"} defaultValue={true}>
              Fêmea
            </MenuItem>
            <MenuItem value={"Macho"}>Macho</MenuItem>
          </Select>
        </FormControl>

        <TextField
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          label="Raça"
          type="text"
          required
        />

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Prenhura</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="false"
            name="radio-buttons-group"
            sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            value={prenhura}
            onChange={(e) => setPrenhura(e.target.value)}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Sim"
              disabled={sexo === "Macho"}
            />
            <FormControlLabel value={false} control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
      </StyeledForm>
      <Button
        variant="outlined"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "18px",
          borderRadius: "15px",
        }}
        onClick={(e) => handleSubmit(e)}
        type="submit"
      >
        Cadastrar
      </Button>
    </StyledContainer>
  );
};

export default CadastroForm;
