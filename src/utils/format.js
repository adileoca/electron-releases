import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { differenceInHours, format } from "date-fns";

import ro from "date-fns/locale/ro";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (differenceInHours(new Date(), date) < 24) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ro });
  }
  return format(date, "d MMM yyyy", { locale: ro });
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
