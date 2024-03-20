export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = ("0" + date.getDate()).slice(-2); // Adds leading zero if needed
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Adds leading zero if needed, month is 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const formattedDate = formatDate("2024-03-15T09:27:53.322Z");
console.log(formattedDate); // Outputs: 15/03/2024
