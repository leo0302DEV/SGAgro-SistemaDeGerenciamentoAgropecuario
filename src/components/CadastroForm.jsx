import {
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

const StyeledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding: 0 1.5rem;
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
  } = useContext(CadastroFormContext);

  return (
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
  );
};

export default CadastroForm;
