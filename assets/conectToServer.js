const returnAllAnimalsObj = async () => {
    const request = await fetch("https://sgagro-sever.onrender.com/animals");
    const uint8Array = new Uint8Array(await request.arrayBuffer());
    const text = new TextDecoder().decode(uint8Array);
    const animalsArray = JSON.parse(text);

    return animalsArray;
};

const createElementOnDb = async (newAnimalObj) => {
    const request = await fetch("https://sgagro-sever.onrender.com/animals", {
        method: "POST",
        body: JSON.stringify(newAnimalObj),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const response = await request.json();

    location.reload();

    return response;
}

const returnOnlyOneAnimalObj = async (animalId) => {
    const request = await fetch(`https://sgagro-sever.onrender.com/animals/${animalId}`);
    const uint8Array = new Uint8Array(await request.arrayBuffer());
    const text = new TextDecoder().decode(uint8Array);
    const animalArray = JSON.parse(text);

    return animalArray;
}

const doPutRequestToDb = async (newInfoObj, animalId) => {
    const request = await fetch(`https://sgagro-sever.onrender.com/animals/${animalId}`, {
        method: "PUT",
        body: JSON.stringify(newInfoObj),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const response = await request.json();

    return response;
}

const doDeleteRequestToDb = async (animalId) => {
    const request = await fetch(`https://sgagro-sever.onrender.com/animals/${animalId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }
    });

    const response = await request.json();

    return response;
}

const serverFunctions = {
    returnAllAnimalsObj,
    createElementOnDb,
    returnOnlyOneAnimalObj,
    doPutRequestToDb,
    doDeleteRequestToDb,
}

export default serverFunctions;
