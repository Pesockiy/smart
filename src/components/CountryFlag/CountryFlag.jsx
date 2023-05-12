const CountryFlag = ({ country }) => (
  <img width={40} src={country.flags.svg} alt={country.name.common} key={country.name.common} />
);

export const createCountryOption = (country) => ({
  label: <CountryFlag country={country} />,
  value: country.name.common,
  code: country.idd,
  info: {
    flags: country.flags,
    code: country.idd,
    cca2: country.cca2,
    cca3: country.cca3,
  },
});

export default CountryFlag;
