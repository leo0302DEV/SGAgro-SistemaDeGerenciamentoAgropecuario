const formatDate = (dateString) => {
    const year = dateString.match(/\d{4}/)[0];
    const month = dateString.match(/-\d{2}-/)[0];
    const day = dateString.match(/-\d{2}$/)[0];

    const dateStringFormated = day + "/" + month + "/" + year;
    const dateStringWithoutHyphen = dateStringFormated.replace(/-/g, "");

    return dateStringWithoutHyphen;
}


const catchInputsValue = (arrInputs, radioInputs) => {
    const arrOfValues = [];
    let radioinputValue;

    arrInputs.forEach((element) => {
        const elementValue = element.value;
        arrOfValues.push(elementValue);
    });

    radioInputs.forEach((element) => {
        if (element.checked) {
            radioinputValue = element.value;
        };
    });

    return {
        numeroBrinco: arrOfValues[0],
        idade: Number(arrOfValues[1]),
        peso: Number(arrOfValues[2]),
        dataCadastramento: arrOfValues[3],
        raçaAnimal: arrOfValues[4],
        sexoAnimal: radioinputValue,
    };
}

const showInfoOnTable = (objInfos, tableBody) => {
    const arrOfTds = [];

    const tr = document.createElement("tr");
    tr.classList.add("body__line");

    for (let i = 0; i < 5; i++) {
        const td = document.createElement("td");
        td.classList.add("line__cell");
        arrOfTds.push(td);
    }

    arrOfTds[0].textContent = objInfos.numeroBrinco;
    arrOfTds[1].textContent = objInfos.peso;
    arrOfTds[2].textContent = objInfos.sexoAnimal;
    arrOfTds[3].textContent = formatDate(objInfos.dataCadastramento);
    arrOfTds[4].textContent = objInfos.raçaAnimal;

    arrOfTds.forEach((tdElement) => {
        tr.appendChild(tdElement);
    });

    tableBody.appendChild(tr);
}

const mainHelpers = {
    catchInputsValue,
    showInfoOnTable,
}

export default mainHelpers;


