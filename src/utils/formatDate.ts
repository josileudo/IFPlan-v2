/**
 * Formats a given date as a string in the format DD/MM/YYYY.
 * Optionally includes time in the format HH:mm if specified.
 *
 * @param {string | number} date - The date to be formatted. Can be a string or a timestamp.
 * @param {boolean} hasTime - Indicates whether the formatted date should include time.
 * @returns {string} The formatted date string.
 */
export const formatDate = (
  date: string | number,
  hasTime: boolean = false,
): string => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.getMonth() + 1;
  const year = dateObject.getFullYear();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const dayString = day.toString().padStart(2, "0");
  const monthString = month.toString().padStart(2, "0");
  const hoursString = hours.toString().padStart(2, "0");
  const minutesString = minutes.toString().padStart(2, "0");

  const dayFixed = dayString.length === 1 ? `0${dayString}` : dayString;
  const monthFixed = monthString.length === 1 ? `0${monthString}` : monthString;

  if (hasTime) {
    return `${dayFixed}/${monthFixed}/${year} - ${hoursString}:${minutesString}`;
  } else {
    return `${dayFixed}/${monthFixed}/${year}`;
  }
};
