import { blackcofferData as data } from "../data/blackcofferData";

export const parsedCountryList = [];

data.forEach((item) => {
  let countryIndex = parsedCountryList.findIndex(
    (element) => element === item.country.toString()
  );

  if (countryIndex === -1) {
    parsedCountryList.push(item.country.toString());
  }
});

//sort parsedCountryList alphabetically

parsedCountryList.sort();

