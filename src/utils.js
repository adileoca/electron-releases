export const getTimestamp = (string) => {
  const dateObj = new Date(string);
  const eestOffset = 180;
  dateObj.setMinutes(
    dateObj.getMinutes() + eestOffset - dateObj.getTimezoneOffset()
  );
  const humanReadable = `${dateObj.getFullYear()}-${String(
    dateObj.getMonth() + 1
  ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
    dateObj.getHours()
  ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}:${String(
    dateObj.getSeconds()
  ).padStart(2, "0")} EEST`;
  return humanReadable;
};
