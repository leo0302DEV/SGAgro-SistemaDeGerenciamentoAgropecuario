import mainHelpers from "./main-helpers.js";

const form = document.querySelector(".page__form");
const formInputs = document.querySelectorAll(".form__input");
const radioInputs = document.querySelectorAll('input[name="div-label__radio"]');
const submitButton = document.querySelector(".form__button");
const tableBody = document.querySelector(".table__body");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();

    try {
        const basicAnimalInfoObj = mainHelpers.catchInputsValue(formInputs, radioInputs);
        mainHelpers.showInfoOnTable(basicAnimalInfoObj, tableBody);
    } catch (error) {
        alert("Preencha os campos do formulário corretamente!");
        console.error(error);
    }

    form.reset();
});



