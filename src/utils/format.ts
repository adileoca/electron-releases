import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { differenceInHours, format, getDate, getHours, getMinutes, getMonth, getSeconds, setMinutes } from "date-fns";

export const formatDate = (
  date: string,
  options?: {
    hour?: Intl.DateTimeFormatOptions["hour"];
    minute?: Intl.DateTimeFormatOptions["minute"];
    second?: Intl.DateTimeFormatOptions["second"];
  }
) => {
  const datetimeLocale = `${"en"}-${"Us"}`;

  const formatter = new Intl.DateTimeFormat(datetimeLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: options?.hour,
    minute: options?.minute,
    second: options?.second,
  });

  return formatter.format(new Date(date));
};

export const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatShippingAddress = (shippingDetails) => {
  const { first_name, last_name, address, zip_code, city, state, country } =
    shippingDetails;
  const formattedAddress = `${first_name} ${last_name}, ${address.replace(
    "\n",
    ", "
  )}, ${zip_code}, ${city}, ${state || ""}, ${country}`;
  return formattedAddress;
};

export const formatSize = (size, reverse = false) => {
  if (!size) return;

  const { width_in, height_in, width_cm, height_cm } = size;
  // Use size.reverse if it exists, otherwise use the reverse parameter
  const shouldReverse = size.reverse !== undefined ? size.reverse : reverse;
  const unit = "cm";
  const formattedWidth = unit === "cm" ? width_cm : `${width_in}"`;
  const formattedHeight = unit === "cm" ? height_cm : `${height_in}"`;
  const unitSuffix = unit === "cm" ? " cm" : "";

  return shouldReverse
    ? `${formattedHeight} x ${formattedWidth}${unitSuffix}`
    : `${formattedWidth} x ${formattedHeight}${unitSuffix}`;
};

// export const getTimestamp = (string) => {
//   const dateObj = new Date(string);
//   const eestOffset = 180;
//   dateObj.setMinutes(
//     dateObj.getMinutes() + eestOffset - dateObj.getTimezoneOffset()
//   );
//   const humanReadable = `${dateObj.getFullYear()}-${String(
//     dateObj.getMonth() + 1
//   ).padStart(2, "0")}-${String(dateObj.getDate()).padStart(2, "0")} ${String(
//     dateObj.getHours()
//   ).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}:${String(
//     dateObj.getSeconds()
//   ).padStart(2, "0")} EEST`;
//   return humanReadable;
// };

