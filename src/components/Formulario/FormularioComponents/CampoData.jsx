import styled from "styled-components";

const StyledBox = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 1.2rem;
  border-radius: 5px;
  border: 1px solid #c2c1c1;

  &:focus + label,
  &.filled + label {
    top: -10px;
    left: 1rem;
    font-size: 14px;
    background-color: white;
    padding: 0 5px;
    color: #3066db;
  }

  &:focus {
    border: 1px solid #3066db !important;
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

const CampoData = ({ label, value, onChange }) => {
  return (
    <StyledBox>
      <StyledInput type={"Date"} value={value} onChange={onChange} />
      <StyledLabel>{label}</StyledLabel>
    </StyledBox>
  );
};

export default CampoData;
