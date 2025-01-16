export default function formatDate(date) {
  const dateArray = date.split("-");
  return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
}
