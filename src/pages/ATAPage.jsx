import React, { useEffect, useRef, useState } from "react";
import formatDate from "../utils/formatDate.js";
import { useNavigate, useParams } from "react-router-dom";

const ATAPage = () => {
  const printRef = useRef();
  const { id } = useParams();
  const [animalData, setAnimalData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/animals/all/${id}`)
      .then((response) => response.json())
      .then((data) => setAnimalData(data))
      .catch((error) => {
        alert("Erro ao emitir ATA.");
        console.log(error);
      });
  }, []);

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Impressão</title>
          <style>
            /* Estilos para a página impressa */
            body {
              font-family: Monaco, monospace;
              margin: 20px;
              padding: 0;
            }
            h1 {
              text-align: center;
              margin-bottom: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            table, th, td {
              border: 1px solid black;
            }
            th, td {
              padding: 10px;
              text-align: left;
            }
            .no-print {
              display: none; /* Esconde o botão na impressão */
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div>
      {/* Conteúdo que será impresso */}
      <div ref={printRef}>
        {animalData ? (
          <>
            <h1>ATA do animal ({animalData.animalRecord.earringId})</h1>
            <h3>Informações básicas:</h3>
            <ul>
              <li>
                <p>Brinco: {animalData.animalRecord.earringId}</p>
              </li>
              <li>
                <p>Idade: {animalData.animalRecord.age}</p>
              </li>
              <li>
                <p>
                  Prenhura:{" "}
                  {animalData.animalRecord.pregnantState === false
                    ? "Não"
                    : "Sim"}
                </p>
              </li>
              <li>
                <p>Raça: {animalData.animalRecord.race}</p>
              </li>
              <li>
                <p>
                  Data de registro:{" "}
                  {formatDate(animalData.animalRecord.registerDate)}
                </p>
              </li>
              <li>
                <p>Sexo: {animalData.animalRecord.sex}</p>
              </li>
              <li>
                <p>
                  Peso da última medição:{" "}
                  {`${animalData.animalRecord.weight}Kg`}
                </p>
              </li>
            </ul>

            <h3>Medicações feitas até o momento:</h3>
            {animalData.animalVaccines.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Data de aplicação</th>
                  </tr>
                </thead>
                <tbody>
                  {animalData.animalVaccines.map((medicacao, index) => (
                    <tr key={index}>
                      <td>{medicacao.Vaccine.name}</td>
                      <td>{medicacao.Vaccine.indicationAplic}</td>
                      <td>{formatDate(medicacao.applicationDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5 style={{ color: "red" }}>
                Esse animal não recebeu nenhum medicamento até o momento
              </h5>
            )}

            <h3>Observações sobre o animal:</h3>
            {animalData.animalNotes.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Anotação</th>
                  </tr>
                </thead>
                <tbody>
                  {animalData.animalNotes.map((nota, index) => (
                    <tr key={index}>
                      <td>{formatDate(nota.creationDate)}</td>
                      <td>{nota.anotations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h5 style={{ color: "red" }}>
                Esse animal não tem observações registradas até o momento
              </h5>
            )}
          </>
        ) : (
          <p>Carregando dados do animal...</p>
        )}
      </div>

      <button
        className="no-print"
        onClick={handlePrint}
        style={{
          marginTop: "1rem",
          padding: "1rem",
          fontSize: "18px",
          marginRight: "1rem",
        }}
      >
        Imprimir
      </button>

      <button
        className="no-print"
        onClick={() => navigate(-1)}
        style={{ marginTop: "1rem", padding: "1rem", fontSize: "18px" }}
      >
        Cancelar
      </button>
    </div>
  );
};

export default ATAPage;
