export const formatDate = (
  date: string,
  options?: {
    hour?: Intl.DateTimeFormatOptions["hour"];
    minute?: Intl.DateTimeFormatOptions["minute"];
    second?: Intl.DateTimeFormatOptions["second"];
    relative?: boolean; // Add the relative option here
  }
) => {
  const datetimeLocale = `${"en"}-${"US"}`;
  const inputDate = new Date(date);
  const now = new Date();

  if (options?.relative) {
    const differenceInMs = now.getTime() - inputDate.getTime();
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));
    const differenceInMinutes = Math.floor(differenceInMs / (1000 * 60));
    const differenceInSeconds = Math.floor(differenceInMs / 1000);

    const rtf = new Intl.RelativeTimeFormat(datetimeLocale, {
      numeric: "auto",
    });

    if (differenceInDays !== 0) {
      return rtf.format(-differenceInDays, "day");
    } else if (differenceInHours !== 0) {
      return rtf.format(-differenceInHours, "hour");
    } else if (differenceInMinutes !== 0) {
      return rtf.format(-differenceInMinutes, "minute");
    } else {
      return rtf.format(-differenceInSeconds, "second");
    }
  } else {
    const formatter = new Intl.DateTimeFormat(datetimeLocale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: options?.hour,
      minute: options?.minute,
      second: options?.second,
    });

    return formatter.format(inputDate);
  }
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


export class CurrencyFormatter {
  private currency: string;

  constructor(currency: string) {
    this.currency = currency;
  }

  public format(amount: number): string {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: this.currency,
    }).format(amount / 100);
  }
}


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

