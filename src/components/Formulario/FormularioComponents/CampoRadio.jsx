import { useContext, useState } from "react";
import styled from "styled-components";
import { ModificarIndividualFormContext } from "../../../providers/ModificarIndividualFormProvider";

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

const CampoRadio = ({ label, onChange, context }) => {
  if (context === ModificarIndividualFormContext) {
    const { radioValue, setRadioValue } = useContext(context);

    return (
      <StyledSection>
        <StyledLabel>{label}</StyledLabel>
        <StyledRadioBox>
          <StyledRadioLabel>
            <StyledInput
              type="radio"
              name="radio"
              value={true}
              onChange={(e) => {
                onChange(e);
                setRadioValue(true);
              }}
              checked={radioValue === true}
            />
            {"Sim"}
          </StyledRadioLabel>
          <StyledRadioLabel>
            <StyledInput
              type="radio"
              name="radio"
              value={false}
              onChange={(e) => {
                onChange(e);
                setRadioValue(false);
              }}
              checked={radioValue === false}
            />
            {"Não"}
          </StyledRadioLabel>
        </StyledRadioBox>
      </StyledSection>
    );
  }

  // Caso o contexto seja diferente, renderiza uma versão básica:
  return (
    <StyledSection>
      <StyledLabel>{label}</StyledLabel>
      <StyledRadioBox>
        <StyledRadioLabel>
          <StyledInput
            type="radio"
            name="radio"
            value={true}
            onChange={onChange}
          />
          {"Sim"}
        </StyledRadioLabel>
        <StyledRadioLabel>
          <StyledInput
            type="radio"
            name="radio"
            value={false}
            onChange={onChange}
          />
          {"Não"}
        </StyledRadioLabel>
      </StyledRadioBox>
    </StyledSection>
  );
};

export default CampoRadio;
