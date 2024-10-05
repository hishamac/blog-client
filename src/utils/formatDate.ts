export function formatDate(dateString: Date) {
  const date = new Date(dateString);

  // CHANGE TIME TO IST
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

export function formatDateWithTimeIST(dateString: string) {
  const date = new Date(dateString);

  // // CHANGE TIME TO IST
  date.setHours(date.getHours() + 5);
  date.setMinutes(date.getMinutes() + 30);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${year}/${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

export function formatDateWithTime(dateString: string) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${year}/${formattedMonth}/${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds} ${ampm}`;
}

export function getTimeFromDate(dateString: string) {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${ampm}`;
}
