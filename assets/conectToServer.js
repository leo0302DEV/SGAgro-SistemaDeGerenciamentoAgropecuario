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

const serverFunctions = {
    returnAllAnimalsObj,
    createElementOnDb,
}

export default serverFunctions;
