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

    arrOfInputs.forEach((input, index) => {
        input.value = dataArr[index];
    });

    selectInput.options.selectedIndex = apiResponse.sexoAnimal === "Fêmea" ? 0 : 1;
    radioInputs[apiResponse.prenhura ? 0 : 1].checked = true;
}

const setTableOfMedicinesInfo = async (tableBody, animalId) => {
    const apiResponse = await returnAnimalObj(animalId);
    const medicineArr = apiResponse.medicamentacao;

    medicineArr.forEach((element) => {
        const { nomeMedicamento: medicineName, dataAplicacao: dateMedicineAplic } = element;

        const tr = document.createElement("tr");
        tr.classList.add("body__linha");

        const tdNome = document.createElement("td");
        tdNome.classList.add("linha__cell");
        tdNome.textContent = medicineName;

        const tdDate = document.createElement("td");
        tdDate.classList.add("linha__cell");
        tdDate.textContent = formatDateMethodsObj.formatDateToUser(dateMedicineAplic);

        tr.append(tdNome, tdDate);
        tableBody.appendChild(tr);
    });
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
    tdNomeMedic.classList.add("linha__cell", "td__nome-medic");
    tdNomeMedic.textContent = selectInputValue;

    const tdDateAplic = document.createElement("td");
    tdDateAplic.classList.add("linha__cell", "td__date-aplic");
    tdDateAplic.textContent = dateOfAplication;

    tr.append(tdNomeMedic, tdDateAplic);
    tableBody.appendChild(tr);
}

const catchDefautInfoAndHistoric = (defautInputs, selectInput, radioInputs, textArea) => {
    const selectInputValue = selectInput.options[selectInput.selectedIndex].value;
    const historicContent = textArea.value;
    const radioInputValue = radioInputs.find(input => input.checked)?.value;

    const [numeroBrinco, idade, peso, dataCadastramento, raçaAnimal] = defautInputs.map(input => input.value);

    return {
        numeroBrinco,
        idade,
        peso,
        dataCadastramento,
        raçaAnimal,
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
