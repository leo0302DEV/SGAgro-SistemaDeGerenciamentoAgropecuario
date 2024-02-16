import serverFunctions from "../conectToServer.js";
import formatDateMethodsObj from "../formatDateScripts.js";

const catchInputsValue = (arrInputs, radioInputs) => {
    const [numeroBrinco, idade, peso, dataCadastramento, raçaAnimal] = arrInputs.map(input => input.value);
    const sexoAnimal = radioInputs.find(input => input.checked)?.value;

    return {
        numeroBrinco,
        idade: Number(idade),
        peso: Number(peso),
        dataCadastramento,
        raçaAnimal,
        sexoAnimal,
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
            dataCadastramento: formatDateMethodsObj.formatDateToUser(animal.dataCadastramento),
            raçaAnimal: animal.raçaAnimal,
            id: animal._id,
        }
    });

    return processedArrOfAnimals;
}

const showInfoOnTable = (animalsArr, tableBody) => {
    const arrOfAnimalsInfo = processInfoFromDb(animalsArr);

    arrOfAnimalsInfo.forEach((animalsInfoObj) => {
        const tr = document.createElement("tr");
        tr.classList.add("body__line");
        tr.setAttribute("data-id", animalsInfoObj.id);

        const infoKeys = ['numeroBrinco', 'peso', 'sexoAnimal', 'dataCadastramento', 'raçaAnimal'];
        const classKeys = ['td__numero-brinco', 'td__peso', 'td__sexo-animal', 'td__data-cadastro', 'td__raca-animal'];

        infoKeys.forEach((key, index) => {
            const td = document.createElement("td");
            td.textContent = animalsInfoObj[key];
            td.classList.add("line__cell", classKeys[index]);
            tr.appendChild(td);
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
