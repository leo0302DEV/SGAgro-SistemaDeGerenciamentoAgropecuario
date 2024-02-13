const returnArrOfEaringNumbers = (earingsString) => {
    const earingsArr = earingsString.match(/\d{3}/g);

    return earingsArr;
}

const returnAnimalsId = (earingsString, tableBodyElements) => {
    const matchElementsArr = [];
    const earingsArr = returnArrOfEaringNumbers(earingsString);

    for (let i = 0; i < tableBodyElements.length; i++) {
        const tdEaringElement = tableBodyElements[i].querySelector(".td__numero-brinco");
        const tdEaringContent = tdEaringElement.textContent;

        for (let j = 0; j < earingsArr.length; j++) {
            if (tdEaringContent === earingsArr[j]) {
                const animalId = tableBodyElements[i].getAttribute("data-id");
                matchElementsArr.push(animalId);
            }
        }
    }

    return matchElementsArr;
}

const modifySomeHelpers = {
    returnAnimalsId,
}

export default modifySomeHelpers;


