const returnSelectInputPreferense = (selectInput) => {
    const selectInputValue = selectInput.options[selectInput.selectedIndex].value;

    return selectInputValue;
}

const iterateOnTable = (array, searchParam, inputValue) => {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const search = element.querySelector(`.${searchParam}`);
        const searchText = search.textContent;
        const regExp = new RegExp(inputValue, "i");

        if (!regExp.test(searchText)) {
            element.classList.add('invisivel');
        } else {
            element.classList.remove('invisivel');
        }
    }
}

const filterElementsOnTable = (inputValue, selectValue, tableBodyElements) => {

    if (inputValue.length > 0) {
        const selectInputPref = returnSelectInputPreferense(selectValue);

        if (selectInputPref === "brinco") {
            iterateOnTable(tableBodyElements, "td__numero-brinco", inputValue);
        } else if (selectInputPref === "peso") {
            iterateOnTable(tableBodyElements, "td__peso", inputValue);
        } else if (selectInputPref === "sexo") {
            iterateOnTable(tableBodyElements, "td__sexo-animal", inputValue);
        } else if (selectInputPref === "data") {
            iterateOnTable(tableBodyElements, "td__data-cadastro", inputValue);
        } else if (selectInputPref === "raca") {
            iterateOnTable(tableBodyElements, "td__raca-animal", inputValue);
        } else {
            selectInputPref = "brinco";
        }
    } else {
        for (let i = 0; i < tableBodyElements.length; i++) {
            const animal = tableBodyElements[i];
            animal.classList.remove('invisivel');
        }
    }
}

export default filterElementsOnTable;