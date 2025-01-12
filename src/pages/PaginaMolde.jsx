import { Outlet } from "react-router-dom";
import styled from "styled-components";
import ResetStyle from "../components/ResetStyle";
import { FaGithub } from "react-icons/fa";
import { AnimalsNumberProvider } from "../providers/AnimalsNumberProvider";
import { CadastroFormProvider } from "../providers/CadastroFromProvider";

const StyledTitle = styled.h1`
  font-size: 20px;
  text-align: center;
  margin: 2rem 0 2.5rem 0;
`;

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  background-color: #528ce4;
  padding: 2rem;
  color: white;
  margin-top: 2.5rem;

  & > span {
    font-size: 18px;
  }

  & > a {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: white;
  }
`;

const PaginaMolde = () => {
  return (
    <AnimalsNumberProvider>
      <CadastroFormProvider>
        <ResetStyle />
        <header>
          <StyledTitle>SGAgro - Sistema de Gestão Agropecuária</StyledTitle>
        </header>
        <Outlet />
        <StyledFooter>
          <span>&copy;Leonardo Kramer Nadal</span>
          <a href="https://github.com/leo0302DEV">
            <FaGithub />
            <span>Leo0302DEV</span>
          </a>
        </StyledFooter>
      </CadastroFormProvider>
    </AnimalsNumberProvider>
  );
};

export default PaginaMolde;
