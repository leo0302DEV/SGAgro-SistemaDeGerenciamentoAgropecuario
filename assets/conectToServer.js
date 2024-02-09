const returnAllAnimalsObj = async () => {
    const request = await fetch("https://sgagro-sever.onrender.com/animals");
    const uint8Array = new Uint8Array(await request.arrayBuffer());
    const text = new TextDecoder().decode(uint8Array);
    const animalsArray = JSON.parse(text);

    return animalsArray;
};

const serverFunctions = {
    returnAllAnimalsObj,
}

export default serverFunctions;
