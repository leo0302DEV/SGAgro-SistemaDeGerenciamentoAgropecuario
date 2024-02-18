import serverFunctions from "../conectToServer.js";
import modifySomeHelpersObj from "./modifySome-helpers.js";

const tableBody = document.querySelector(".table__corpo");
const historicoVet = document.querySelector("textarea");
const saveInfoBtn = document.querySelector(".main-table__save-button");
const addInfoOnTableBtn = document.querySelector(".med-table__add-button");
const inputDateAplic = document.querySelector(".med-table__date-aplic");
const selectNameInput = document.querySelector(".med-table__select-option");
const numeroBrincosSpan = document.querySelector(".main-table__numero-brincos");
const numeroBrincos = localStorage.getItem("stringOfAnimalsNumber");
const cameBackBtn = document.querySelector(".cabecalho__link");

numeroBrincosSpan.textContent = numeroBrincos;

addInfoOnTableBtn.addEventListener("click", () => {
    modifySomeHelpersObj.addInfoOnTable(inputDateAplic, selectNameInput, tableBody);
});

saveInfoBtn.addEventListener("click", async () => {
    try {
        const modificationsObj = modifySomeHelpersObj.returnAllInfos(tableBody, historicoVet);
        const serverResponse = await serverFunctions.doPutInGroupRequest(numeroBrincos, modificationsObj);
        alert(serverResponse.message);
    } catch (error) {
        alert("Houve um erro, tente novamente");
        console.log(error);
    }
});

cameBackBtn.addEventListener("click", () => {
    localStorage.removeItem("stringOfAnimalsNumber");
});
