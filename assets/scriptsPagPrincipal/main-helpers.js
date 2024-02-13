import serverFunctions from "../conectToServer.js";

const formatDate = (dateString) => {
    const dataHoraOriginal = new Date(dateString);
    const dataHoraUTC = dataHoraOriginal.toISOString();
    const opcoes = { timeZone: "UTC", year: 'numeric', month: '2-digit', day: '2-digit' };
    const dataHoraFormatada = dataHoraOriginal.toLocaleString('pt-BR', opcoes);

    return dataHoraFormatada;
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
        historicoVeterinario: "",
        prenhura: false,
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
            id: animal._id,
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
        tr.setAttribute("data-id", animalsInfoObj.id);

        for (let i = 0; i < 5; i++) {
            const td = document.createElement("td");
            td.classList.add("line__cell");
            arrOfTds.push(td);
        }

        arrOfTds[0].textContent = animalsInfoObj.numeroBrinco;
        arrOfTds[0].classList.add("td__numero-brinco");

        arrOfTds[1].textContent = animalsInfoObj.peso;
        arrOfTds[1].classList.add("td__peso");

        arrOfTds[2].textContent = animalsInfoObj.sexoAnimal;
        arrOfTds[2].classList.add("td__sexo-animal");

        arrOfTds[3].textContent = animalsInfoObj.dataCadastramento;
        arrOfTds[3].classList.add("td__data-cadastro");

        arrOfTds[4].textContent = animalsInfoObj.raçaAnimal;
        arrOfTds[4].classList.add("td__raca-animal");

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

const performsFormActions = (formInputs, radioInputs) => {
    const basicAnimalInfoObj = catchInputsValue(formInputs, radioInputs);
    serverFunctions.createElementOnDb(basicAnimalInfoObj);
}

const mainHelpers = {
    performsFormActions,
    performsTableActions,
    formatDate,
}

export default mainHelpers;