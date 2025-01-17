import styled from "styled-components";

const StyledBox = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  margin: 12rem 0;
`;

const CrazyCircle = styled.div`
  width: 39px;
  height: 39px;
  background-color: #528ce4;
  border-radius: 50%;
  animation: move 400ms cubic-bezier(0.42, 0, 0.58, 1) infinite alternate;

  @keyframes move {
    0% {
      background-color: #528ce4;
    }
    25% {
      background-color: #4372b9;
    }
    50% {
      background-color: #355b94;
    }
    75% {
      background-color: #284570;
    }
    100% {
      background-color: #1a2d49;
    }
  }
`;

const StyledSpan = styled.span``;

const LoggingBanner = () => {
  return (
    <StyledBox>
      <CrazyCircle />
      <StyledSpan>Carregando, aguarde...</StyledSpan>
    </StyledBox>
  );
};

export default LoggingBanner;
