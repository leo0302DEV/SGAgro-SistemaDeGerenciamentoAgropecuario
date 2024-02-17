import serverFunctions from "../conectToServer.js";
import moreInfoHelpers from "./moreInfo-helpers.js";

const animalId = localStorage.getItem("animalId");
const backLinkBtn = document.querySelector(".cabecalho__link");
const defautInputs = document.querySelectorAll(".form-label__input");
const selectOptionsInput = document.querySelector(".label__select");
const radioInputs = document.querySelectorAll("input[name=prenhura__radio-input]");
const tableBody = document.querySelector(".table__body");
const addMedicineBtn = document.querySelector(".input-div__add-button");
const selectOptionsMedicine = document.querySelector(".input-div__options");
const aplicationDateInput = document.querySelector(".input-div__aplicacao-data");
const textArea = document.querySelector(".historico-veterinario__label-textArea");
const saveInfosBtn = document.querySelector(".footer__button-save-info");
const deleteAnimalBtn = document.querySelector(".footer__button-delete-animal");

moreInfoHelpers.setInputsValue(defautInputs, selectOptionsInput, animalId, radioInputs);
moreInfoHelpers.setTableOfMedicinesInfo(tableBody, animalId);
moreInfoHelpers.setVetHistoric(textArea, animalId);

addMedicineBtn.addEventListener("click", () => {
    moreInfoHelpers.addInfoOnTable(selectOptionsMedicine, aplicationDateInput, tableBody);
});

tableBody.addEventListener("dblclick", (event) => {
    const eventFoucus = event.target.parentNode;
    const proptResposta = confirm("Você deseja excluir este registro? Atenção, essa ação é irreversível.");

    if (proptResposta) {
        tableBody.removeChild(eventFoucus);
    } else {
        return;
    }
});

saveInfosBtn.addEventListener("click", () => {
    try {
        const tableInfoArr = moreInfoHelpers.catchTableInfos(tableBody);
        const defautInfoObj = moreInfoHelpers.catchDefautInfoAndHistoric(defautInputs, selectOptionsInput, radioInputs, textArea);

        moreInfoHelpers.doPutRequestToServer(tableInfoArr, defautInfoObj, animalId);

        alert("Atualizado com sucesso!");
    } catch (error) {
        alert("Não foi possível atualizar o registro. Tente novamente.");
        console.error(error);
    }
});

deleteAnimalBtn.addEventListener("click", async () => {
    const promptResposta = confirm("Você deseja excluir este cadastro do sistema? Cuidado! Esta ação é irreversível.");

    if (promptResposta) {
        await moreInfoHelpers.doDeleteRequestToServer(animalId);
        window.location.href = "./index.html";
        localStorage.removeItem("animalId");
    } else {
        return;
    }
});

backLinkBtn.addEventListener("click", () => {
    localStorage.removeItem("animalId");
})
