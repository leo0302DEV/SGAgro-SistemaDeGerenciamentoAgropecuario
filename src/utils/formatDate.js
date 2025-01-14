export default function formatDate(date) {
  const dateArray = date.split("-");
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}

export function formatDateString(dateString) {
  // Converte o string em um objeto Date
  const date = new Date(dateString);

  // Verifica se a data é válida
  if (isNaN(date.getTime())) {
    throw new Error("Data inválida");
  }

  // Extrai ano, mês e dia, garantindo o formato de dois dígitos para mês e dia
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Retorna no formato YYYY-MM-DD
  return `${year}-${month}-${day}`;
}
