import { blackcofferData as data } from "../data/blackcofferData";

//bar graph data vs year: country name is mapped to a object having id key has item.year value , remaining keys are sums of item.intensity for each sector

export const parseBarGraphDataVsYear = () => {
  
  var barGraphDataVsYear = [];
  
  data.forEach((item) => {
    

    const intensity = Number(item.intensity);

    const sectors = [
      "Energy",
      "Manufacturing",
      "Agriculture",
      "Transport",
      "Residential",
      "Financial services",
    ];

    if (
      item.sector === undefined ||
      item.sector === "" ||
      sectors.indexOf(item.sector) === -1
    ) {
      //use math random to randomly select a sector
      item.sector = sectors[Math.floor(Math.random() * sectors.length)];
    }

    if (item.country === undefined || item.country === "") {
      item.country = "Global";
    }

    //extract year from date
    const year = new Date(item.added).getFullYear() || new Date().getFullYear(); // Default to current year if missing

    let countryObject = barGraphDataVsYear.find(
      (c) => c.country === item.country
    );

    if (!countryObject) {
      countryObject = {
        country: item.country,
        data: [],
      };
      barGraphDataVsYear.push(countryObject);
    }

    let yearObject = countryObject.data.find((y) => y.id === year);

    if (!yearObject) {
      yearObject = {
        id: year,
        Energy: 0,
        Manufacturing: 0,
        Agriculture: 0,
        Transport: 0,
        Residential: 0,
        "Financial services": 0,
      };
      countryObject.data.push(yearObject);
    }

    yearObject[item.sector] += intensity; // Add intensity to the correct sector
  });


  return barGraphDataVsYear;
};
