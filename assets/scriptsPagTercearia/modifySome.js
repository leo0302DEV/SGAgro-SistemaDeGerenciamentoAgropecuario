import serverFunctions from "../conectToServer.js";

const tableBody = document.querySelector(".table__corpo");
const historicoVet = document.querySelector("textarea");
const saveInfoBtn = document.querySelector(".main-table__save-button");
const addInfoOnTableBtn = document.querySelector(".med-table__add-button");
const inputDateAplic = document.querySelector(".med-table__date-aplic");
const selectNameInput = document.querySelector(".med-table__select-option");
const numeroBrincosSpan = document.querySelector(".main-table__numero-brincos");
const numeroBrincos = localStorage.getItem("stringOfAnimalsNumber");

numeroBrincosSpan.textContent = numeroBrincos;

const formatDateToTable = (stringToParse) => {
    const year = stringToParse.match(/\d{4}/)[0];
    const month = stringToParse.match(/-\d{2}-/)[0].replace(/-/g, "/");
    const day = stringToParse.match(/-\d{2}$/)[0].replace(/-/, "");
    const dataFromatada = day + month + year;

    return dataFromatada;
}

const addInfoOnTable = (inputDate, inputName, tableBody) => {
    const dataAplic = formatDateToTable(inputDate.value);
    const medicineSelected = inputName.options[inputName.selectedIndex].value;

    const tr = document.createElement("tr");
    tr.classList.add("corpo__linha");

    const tdName = document.createElement("td");
    tdName.classList.add("linha__celula");
    tdName.textContent = medicineSelected;

    const tdData = document.createElement("td");
    tdData.classList.add("linha__celula");
    tdData.textContent = dataAplic;

    tr.appendChild(tdName);
    tr.appendChild(tdData);

    tableBody.appendChild(tr);
}

const formatDateToServer = (stringToParse) => {
    const year = stringToParse.match(/\d{4}/)[0];
    const month = stringToParse.match(/\/\d{2}\//)[0].replace(/\//g, "-");
    const day = stringToParse.match(/^\d{2}\//)[0].replace(/\//g, "");
    const dataFormatada = year + month + day + "T00:00:00.000Z";

    return dataFormatada;
}

const returnAllInfos = (tableElement, historicoVet) => {
    const arrOfTableLines = tableElement.querySelectorAll(".corpo__linha");
    const arrOfMedicinesInfo = [];
    const historicoVeterinario = historicoVet.value;

    if (arrOfTableLines.length !== 0) {
        arrOfTableLines.forEach(trElement => {
            const arrOfTableCells = trElement.querySelectorAll(".linha__celula");
            const medName = arrOfTableCells[0].textContent;
            const dateAplic = formatDateToServer(arrOfTableCells[1].textContent);

            arrOfMedicinesInfo.push({
                nomeMedicamento: medName,
                dataAplicacao: dateAplic,
            });
        });

        return {
            medicamentacao: arrOfMedicinesInfo,
            historicoVeterinario: historicoVeterinario,
        }

    } else {
        alert("Antes de salvar as alterações, adicione algo na tabela!");
        return;
    }
}

addInfoOnTableBtn.addEventListener("click", () => {
    addInfoOnTable(inputDateAplic, selectNameInput, tableBody);
});

saveInfoBtn.addEventListener("click", async () => {
    try {
        const modificationsObj = returnAllInfos(tableBody, historicoVet);
        await serverFunctions.doPutInGroupRequest(numeroBrincos, modificationsObj);
        alert("Cadastros modificados com sucesso!");
    } catch (error) {
        console.log(error);
        alert("Houve um erro, tente novamente");
    }
});
