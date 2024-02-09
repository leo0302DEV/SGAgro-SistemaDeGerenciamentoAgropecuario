import serverFunctions from "./conectToServer.js";

const formatDate = (dateString) => {
    const modifyString = dateString.replace("T00:00:00.000Z", "");

    const year = modifyString.match(/\d{4}/)[0];
    const month = modifyString.match(/-\d{2}-/)[0];
    const day = modifyString.match(/-\d{2}$/)[0];

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

const processInfoFromDb = (animalsArr) => {
    const processedArrOfAnimals = animalsArr.map((animal) => {
        return {
            numeroBrinco: animal.numeroBrinco,
            peso: animal.peso,
            sexoAnimal: animal.sexoAnimal,
            dataCadastramento: formatDate(animal.dataCadastramento),
            raçaAnimal: animal.raçaAnimal,
        }
    });

    return processedArrOfAnimals;
}

const showInfoOnTable = (animalsArr, tableBody) => {

    const arrOfAnimalsInfo = processInfoFromDb(animalsArr);

    arrOfAnimalsInfo.forEach((animalsInfoObj) => {
        const arrOfTds = [];

        const tr = document.createElement("tr");
        tr.classList.add("body__line");

        for (let i = 0; i < 5; i++) {
            const td = document.createElement("td");
            td.classList.add("line__cell");
            arrOfTds.push(td);
        }

        arrOfTds[0].textContent = animalsInfoObj.numeroBrinco;
        arrOfTds[1].textContent = animalsInfoObj.peso;
        arrOfTds[2].textContent = animalsInfoObj.sexoAnimal;
        arrOfTds[3].textContent = animalsInfoObj.dataCadastramento;
        arrOfTds[4].textContent = animalsInfoObj.raçaAnimal;

        arrOfTds.forEach((tdElement) => {
            tr.appendChild(tdElement);
        });

        tableBody.appendChild(tr);
    });
}

const performsTableActions = async (tableBody) => {
    const responseFromServer = await serverFunctions.returnAllAnimalsObj();
    showInfoOnTable(responseFromServer, tableBody);
}

const mainHelpers = {
    catchInputsValue,
    performsTableActions,
}

export default mainHelpers;
