import serverFunctions from "../conectToServer.js";
import formatDateMethodsObj from "../formatDateScripts.js";

const processInfoFromDb = (animalsArr) => {
    const processedArrOfAnimals = animalsArr.map((animal) => {
        return {
            numeroBrinco: animal.numeroBrinco,
            peso: animal.peso,
            sexoAnimal: animal.sexoAnimal,
            dataCadastramento: formatDateMethodsObj.formatDateToUser(animal.dataCadastramento),
            raçaAnimal: animal.raçaAnimal,
            id: animal._id,
        }
    });

    return processedArrOfAnimals;
}

const catchInputsValue = (arrInputs, radioInputs) => {
    const [numeroBrinco, idade, peso, dataCadastro, raca] = [...arrInputs].map(element => element.value);
    const radioInputValue = [...radioInputs].find(element => element.checked).value;

    return {
        numeroBrinco: numeroBrinco,
        idade: Number(idade),
        peso: Number(peso),
        dataCadastramento: dataCadastro,
        raçaAnimal: raca,
        sexoAnimal: radioInputValue,
        historicoVeterinario: "",
        prenhura: false,
    };
}

const showInfoOnTable = (animalsArr, tableBody) => {
    const arrOfAnimalsInfo = processInfoFromDb(animalsArr);

    arrOfAnimalsInfo.forEach((animalsInfoObj) => {
        const { numeroBrinco, peso, sexoAnimal, dataCadastramento, raçaAnimal, id } = animalsInfoObj;
        const tdClassList = ["td__numero-brinco", "td__peso", "td__sexo-animal", "td__data-cadastro", "td__raca-animal"];
        const arrOfTds = [];

        const tr = document.createElement("tr");
        tr.classList.add("body__line");
        tr.setAttribute("data-id", id);

        for (let i = 0; i < tdClassList.length; i++) {
            const td = document.createElement("td");
            td.classList.add("line__cell", tdClassList[i]);
            arrOfTds.push(td);
        }

        arrOfTds[0].textContent = numeroBrinco;
        arrOfTds[1].textContent = peso;
        arrOfTds[2].textContent = sexoAnimal;
        arrOfTds[3].textContent = dataCadastramento;
        arrOfTds[4].textContent = raçaAnimal;

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
}

export default mainHelpers;
