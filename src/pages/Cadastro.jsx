import CadastroForm from "../components/CadastroForm";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

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

const Cadastro = () => {
  const navigate = useNavigate();

  return (
    <StyledFormSection>
      <PageTitle>
        <StyledText onClick={() => navigate("/")}>Início</StyledText> - cadastro
      </PageTitle>
      <CadastroForm />
    </StyledFormSection>
  );
};

export default Cadastro;
