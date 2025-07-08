export default function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${year.slice(2)}/${month}/${day}`;
}
