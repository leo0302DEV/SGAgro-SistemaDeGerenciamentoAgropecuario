import mainHelpers from "./main-helpers.js";
import filterElementsOnTable from "./filter-helpers.js";

const form = document.querySelector(".page__form");
const formInputs = document.querySelectorAll(".form__input");
const radioInputs = document.querySelectorAll('input[name="div-label__radio"]');
const submitButton = document.querySelector(".form__button");
const tableBody = document.querySelector(".table__body");
const filterInput = document.querySelector("#filter__input");
const selectInput = document.querySelector(".filter__config");

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
