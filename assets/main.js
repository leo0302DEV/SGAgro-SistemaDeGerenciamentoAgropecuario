import mainHelpers from "./main-helpers.js";

const form = document.querySelector(".page__form");
const formInputs = document.querySelectorAll(".form__input");
const radioInputs = document.querySelectorAll('input[name="div-label__radio"]');
const submitButton = document.querySelector(".form__button");
const tableBody = document.querySelector(".table__body");

mainHelpers.performsTableActions(tableBody);

submitButton.addEventListener("click", async (e) => {
    e.preventDefault();

    const basicAnimalInfoObj = mainHelpers.catchInputsValue(formInputs, radioInputs);

    form.reset();
});
