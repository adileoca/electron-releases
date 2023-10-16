import { Flag } from "./flag";

const Row = ({ label, value }) => (
  <div className="flex justify-between">
    <h4 className="text-neutral-600">{label}</h4>
    {value}
  </div>
);

const CountryFlag = ({ country }) => (
  <div>
    <span className="pr-2">{country}</span>
    <Flag countryCode={country} />
  </div>
);

export const AddressTable = ({
  label,
  lastName,
  firstName,
  address,
  zipCode,
  city,
  country,
}) => (
  <>
    <h3 className="pb-2.5 text-sm font-medium text-neutral-600">{label}</h3>
    <div className="space-y-1">
      <Row label="Nume" value={`${lastName} ${firstName}`} />
      <Row label="Adresa" value={address} />
      <Row label="Cod Postal" value={zipCode} />
      <Row label="Oras" value={city} />
      <Row label="Tara" value={<CountryFlag country={country} />} />
    </div>
  </>
);
