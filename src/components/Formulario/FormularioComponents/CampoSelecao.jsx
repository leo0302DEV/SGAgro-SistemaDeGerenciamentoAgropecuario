import styled from "styled-components";

const StyledBox = styled.div`
  width: 100%;
  position: relative;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.2rem;
  border-radius: 5px;
  border: 1px solid #c2c1c1;
  font-size: 14px;
  color: #4e4e4e;

  &:focus + label {
    color: #3066db;
  }

  &:focus {
    border-color: #3066db;
    outline: none;
  }
`;

const StyledLabel = styled.label`
  position: absolute;
  z-index: 1;
  top: -9.5px;
  left: 1.2rem;
  color: #4e4e4e;
  font-size: 14px;
  font-weight: 300;
  background-color: white;
  padding: 2px;
`;

const CampoSelecao = ({ label, options, value, onChange }) => {
  return (
    <StyledBox>
      <StyledSelect onChange={onChange} value={value}>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </StyledSelect>
      <StyledLabel>{label}</StyledLabel>
    </StyledBox>
  );
};

export default CampoSelecao;
