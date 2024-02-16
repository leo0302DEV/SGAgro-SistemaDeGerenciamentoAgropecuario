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
        const classMap = {
            'brinco': 'td__numero-brinco',
            'peso': 'td__peso',
            'sexo': 'td__sexo-animal',
            'data': 'td__data-cadastro',
            'raca': 'td__raca-animal'
        };

        const className = classMap[selectInputPref] || 'td__numero-brinco';
        iterateOnTable(tableBodyElements, className, inputValue);
    } else {
        tableBodyElements.forEach(animal => animal.classList.remove('invisivel'));
    }
}

export default filterElementsOnTable;
