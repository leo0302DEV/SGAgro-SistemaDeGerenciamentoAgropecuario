import serverFunctions from "../conectToServer.js";
import formatDateMethodsObj from "../formatDateScripts.js";

const returnAnimalObj = async (id) => {
    const animalObjInfo = await serverFunctions.returnOnlyOneAnimalObj(id);

    return animalObjInfo;
}

const setInputsValue = async (arrOfInputs, selectInput, animalId, radioInputs) => {
    const apiResponse = await returnAnimalObj(animalId);
    const dataFormatada = formatDateMethodsObj.formatDateToUser(apiResponse.dataCadastramento);
    const dataArr = [
        apiResponse.numeroBrinco,
        apiResponse.idade,
        apiResponse.peso,
        formatDateMethodsObj.formatDateToInputDate(dataFormatada),
        apiResponse.raçaAnimal,
    ];

    for (let i = 0; i < arrOfInputs.length; i++) {
        arrOfInputs[i].value = dataArr[i];
    }

    if (apiResponse.sexoAnimal === "Fêmea") {
        selectInput.options.selectedIndex = 0;
    } else {
        selectInput.options.selectedIndex = 1;
    }

    if (apiResponse.prenhura === false) {
        radioInputs[1].checked = true;
    } else {
        radioInputs[0].checked = true;
    }
}

const setTableOfMedicinesInfo = async (tableBody, animalId) => {
    const apiResponse = await returnAnimalObj(animalId);
    const medicineArr = apiResponse.medicamentacao;

    if (medicineArr.length > 0) {
        medicineArr.forEach((element) => {
            const medicineName = element.nomeMedicamento;
            const dateMedicineAplic = element.dataAplicacao;

            const tr = document.createElement("tr");
            tr.classList.add("body__linha");

            const tdNome = document.createElement("td");
            tdNome.classList.add("linha__cell");
            tdNome.textContent = medicineName;

            const tdDate = document.createElement("td");
            tdDate.classList.add("linha__cell");
            tdDate.textContent = formatDateMethodsObj.formatDateToUser(dateMedicineAplic);

            tr.appendChild(tdNome);
            tr.appendChild(tdDate);

            tableBody.appendChild(tr);
        });
    } else {
        return;
    }
}

const setVetHistoric = async (textArea, animalId) => {
    const animalObj = await returnAnimalObj(animalId);
    const vetHistoric = animalObj.historicoVeterinario;

    textArea.textContent = vetHistoric;
}

const addInfoOnTable = (selectInput, dateInput, tableBody) => {
    const selectInputValue = selectInput.options[selectInput.selectedIndex].value;
    const dateOfAplication = formatDateMethodsObj.formatDateToUser(dateInput.value);

    const tr = document.createElement("tr");
    tr.classList.add("body__linha");

    const tdNomeMedic = document.createElement("td");
    tdNomeMedic.classList.add("linha__cell");
    tdNomeMedic.textContent = selectInputValue;

    const tdDateAplic = document.createElement("td");
    tdDateAplic.classList.add("linha__cell");
    tdDateAplic.textContent = dateOfAplication;

    tr.appendChild(tdNomeMedic);
    tr.appendChild(tdDateAplic);

    tableBody.appendChild(tr);
}

const catchDefautInfoAndHistoric = (defautInputs, selectInput, radioInputs, textArea) => {
    const selectInputValue = selectInput.options[selectInput.selectedIndex].value;
    const historicContent = textArea.value;
    let radioInputValue;

    radioInputs.forEach((element) => {
        if (element.checked) {
            radioInputValue = element.value;
        } else {
            return;
        }
    });

    return {
        numeroBrinco: defautInputs[0].value,
        idade: defautInputs[1].value,
        peso: defautInputs[2].value,
        dataCadastramento: defautInputs[3].value,
        raçaAnimal: defautInputs[4].value,
        sexoAnimal: selectInputValue,
        prenhura: radioInputValue,
        historicoVeterinario: historicContent,
    }
}

const catchTableInfos = (tableBody) => {
    const tableBodyChildes = tableBody.querySelectorAll(".body__linha");
    const tableMedicInfoArr = [];

    tableBodyChildes.forEach((element) => {
        const elementsChilds = element.querySelectorAll(".linha__cell");
        const medName = elementsChilds[0].textContent;
        const medDataAplic = formatDateMethodsObj.formatDateToServer(elementsChilds[1].textContent);
        tableMedicInfoArr.push({
            nomeMedicamento: medName,
            dataAplicacao: medDataAplic,
        });
    });

    return tableMedicInfoArr;
}

const doPutRequestToServer = (medArr, defaultInfoObj, animalId) => {
    const requestBody = {
        ...defaultInfoObj,
        medicamentacao: medArr,
    }

    serverFunctions.doPutRequestToDb(requestBody, animalId);
}

const doDeleteRequestToServer = async (animalId) => {
    await serverFunctions.doDeleteRequestToDb(animalId);
}

const moreInfoHelpers = {
    setInputsValue,
    setTableOfMedicinesInfo,
    addInfoOnTable,
    catchDefautInfoAndHistoric,
    catchTableInfos,
    doPutRequestToServer,
    doDeleteRequestToServer,
    setVetHistoric,
}

export default moreInfoHelpers;
