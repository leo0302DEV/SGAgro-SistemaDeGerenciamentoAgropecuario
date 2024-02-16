import formatDateMethodsObj from "../formatDateScripts.js";

const addInfoOnTable = (inputDate, inputName, tableBody) => {
    const dataAplic = formatDateMethodsObj.formatDateToUser(inputDate.value);
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

const returnAllInfos = (tableElement, historicoVet) => {
    const arrOfTableLines = tableElement.querySelectorAll(".corpo__linha");
    const arrOfMedicinesInfo = [];
    const historicoVeterinario = historicoVet.value;

    if (arrOfTableLines.length !== 0) {
        arrOfTableLines.forEach(trElement => {
            const arrOfTableCells = trElement.querySelectorAll(".linha__celula");
            const medName = arrOfTableCells[0].textContent;
            const dateAplic = formatDateMethodsObj.formatDateToServer(arrOfTableCells[1].textContent);

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

const modifySomeHelpersObj = {
    addInfoOnTable,
    returnAllInfos,
}

export default modifySomeHelpersObj;
