const formatDateToInputDate = (dateString) => {
    const year = dateString.match(/\/\d{4}$/)[0].replace("/", "");
    const month = dateString.match(/\/\d{2}\//)[0].replace(/\//g, "");
    const day = dateString.match(/^\d{2}\//)[0].replace("/", "");
    const dataFormatedString = year + "-" + month + "-" + day;

    return dataFormatedString
}

const formatDateToServer = (dateString) => {
    const dataPreFormatada = formatDateToInputDate(dateString);
    const dataFormatada = dataPreFormatada + "T00:00:00.000Z";

    return dataFormatada;
}

const formatDateToUser = (dateString) => {
    const dataHoraOriginal = new Date(dateString);
    const dataHoraUTC = dataHoraOriginal.toISOString();
    const opcoes = { timeZone: "UTC", year: 'numeric', month: '2-digit', day: '2-digit' };
    const dataHoraFormatada = dataHoraOriginal.toLocaleString('pt-BR', opcoes);

    return dataHoraFormatada;
}

const formatDateMethodsObj = {
    formatDateToInputDate,
    formatDateToServer,
    formatDateToUser,
}

export default formatDateMethodsObj;
