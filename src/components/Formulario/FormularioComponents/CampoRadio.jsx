import styled from "styled-components";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const StyledRadioBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const StyledLabel = styled.label`
  font-size: 18px;
  font-weight: 300;
  color: #4e4e4e;
`;

const StyledInput = styled.input`
  transform: scale(1.5);
`;

const StyledRadioLabel = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-size: 18px;
  color: #4e4e4e;
  font-weight: 300;
`;

const CampoRadio = ({ options, label, onChange }) => {
  return (
    <StyledSection>
      <StyledLabel>{label}</StyledLabel>
      <StyledRadioBox>
        {options.map((option) => {
          return (
            <StyledRadioLabel key={option.label}>
              <StyledInput
                type="radio"
                name="radio"
                value={option.value}
                onChange={onChange}
              />
              {option.label}
            </StyledRadioLabel>
          );
        })}
      </StyledRadioBox>
    </StyledSection>
  );
};

export default CampoRadio;
