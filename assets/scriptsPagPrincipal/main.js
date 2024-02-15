import mainHelpers from "./main-helpers.js";
import filterElementsOnTable from "./filter-helpers.js";

const form = document.querySelector(".page__form");
const formInputs = document.querySelectorAll(".form__input");
const radioInputs = document.querySelectorAll('input[name="div-label__radio"]');
const submitButton = document.querySelector(".form__button");
const tableBody = document.querySelector(".table__body");
const table = document.querySelector(".page__table");
const filterInput = document.querySelector("#filter__input");
const selectInput = document.querySelector(".filter__config");
const modifySomeBtn = document.querySelector(".main-content__modify-some-animals");

mainHelpers.performsTableActions(tableBody);

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    mainHelpers.performsFormActions(formInputs, radioInputs);

    form.reset();
});

filterInput.addEventListener("input", () => {
    const inputValue = filterInput.value;
    const tableBodyElements = document.querySelectorAll(".body__line");

    filterElementsOnTable(inputValue, selectInput, tableBodyElements);
});

table.addEventListener("dblclick", (event) => {
    const teagetElement = event.target.parentNode;
    const idDadTargetElement = teagetElement.getAttribute("data-id");

    localStorage.setItem("animalId", idDadTargetElement);

    window.location.href = "../moreInfo.html";
});

modifySomeBtn.addEventListener("click", () => {
    const numeroBrincos = prompt("Informe o número do brinco dos animais que você deseja modificar em grupo.");

    localStorage.setItem("stringOfAnimalsNumber", JSON.stringify(numeroBrincos));

    window.location.href = "./modifySome.html";
});
