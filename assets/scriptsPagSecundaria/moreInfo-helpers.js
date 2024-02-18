import serverFunctions from "../conectToServer.js";
import formatDateMethodsObj from "../formatDateScripts.js";

const returnAnimalObj = async (id) => {
    const animalObjInfo = await serverFunctions.returnOnlyOneAnimalObj(id);
    return animalObjInfo;
}

const setInputsValue = async (arrOfInputs, selectInput, animalId, radioInputs) => {
    const { numeroBrinco, idade, peso, dataCadastramento, raçaAnimal, sexoAnimal, prenhura } = await returnAnimalObj(animalId);
    const dataFomatada = formatDateMethodsObj.formatForInputFromUser(dataCadastramento);
    const dataArr = [numeroBrinco, idade, peso, dataFomatada, raçaAnimal];

    arrOfInputs.forEach((input, index) => input.value = dataArr[index]);

    sexoAnimal === "Fêmea" ? selectInput.options.selectedIndex = 0 : selectInput.options.selectedIndex = 1;
    !prenhura ? radioInputs[1].checked = true : radioInputs[0].checked = true;
}

const setTableOfMedicinesInfo = async (tableBody, animalId) => {
    const apiResponse = await returnAnimalObj(animalId);
    const medicineArr = apiResponse.medicamentacao;

    if (medicineArr.length > 0) {
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

    return;
}

const setVetHistoric = async (textArea, animalId) => {
    const animalObj = await returnAnimalObj(animalId);
    textArea.textContent = animalObj.historicoVeterinario;
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

    tr.append(tdNomeMedic, tdDateAplic);

    tableBody.appendChild(tr);
}

const catchDefautInfoAndHistoric = (defautInputs, selectInput, radioInputs, textArea) => {
    const selectInputValue = selectInput.options[selectInput.selectedIndex].value;
    const [brinco, idade, peso, cadastro, raca] = defautInputs;
    const radioInputValue = [...radioInputs].find(element => element.checked).value;

    return {
        numeroBrinco: brinco.value,
        idade: idade.value,
        peso: peso.value,
        dataCadastramento: cadastro.value,
        raçaAnimal: raca.value,
        sexoAnimal: selectInputValue,
        prenhura: radioInputValue,
        historicoVeterinario: textArea.value,
    }
}

const catchTableInfos = (tableBody) => {
    const tableBodyChildes = tableBody.querySelectorAll(".body__linha");
    const tableMedicInfoArr = [];

    tableBodyChildes.forEach((element) => {
        const [medName, medDataAplic] = element.querySelectorAll(".linha__cell");
        tableMedicInfoArr.push({
            nomeMedicamento: medName.textContent,
            dataAplicacao: formatDateMethodsObj.formatDateToServer(medDataAplic.textContent),
        });
    });

    return tableMedicInfoArr;
}

const doPutRequestToServer = async (medArr, defaultInfoObj, animalId) => {
    const requestBody = {
        ...defaultInfoObj,
        medicamentacao: medArr,
    }
    const response = await serverFunctions.doPutRequestToDb(requestBody, animalId);

    return response;
}

const doDeleteRequestToServer = async (animalId) => {
    const response = await serverFunctions.doDeleteRequestToDb(animalId);

    return response;
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
