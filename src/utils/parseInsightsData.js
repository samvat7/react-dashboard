import { tokens } from "../theme";

var lineGraphData = [];

var barGraphData = [];

export const parseInsightsData = (data) => {
  let sumOfIntensities = 0;
  let sumOfLikelihoods = 0;
  let totalIntensitiesAmerica = 0;
  let totalIntensitiesChina = 0;
  let totalIntensitiesGermany = 0;
  let totalIntensitiesJapan = 0;
  let totalIntensitiesIndia = 0;
  let totalLikelihoodsAmerica = 0;
  let totalLikelihoodsChina = 0;
  let totalLikelihoodsGermany = 0;
  let totalLikelihoodsJapan = 0;
  let totalLikelihoodsIndia = 0;

  lineGraphData = [
    {
      id: "america",
      color: tokens("dark").greenAccent[500],
      data: [],
    },
    {
      id: "china",
      color: tokens("dark").blueAccent[300],
      data: [],
    },
    {
      id: "russia",
      color: tokens("dark").redAccent[200],
      data: [],
    },
    {
      id: "india",
      color: tokens("dark").redAccent[500],
      data: [],
    },
    {
      id: "japan",
      color: tokens("dark").blueAccent[500],
      data: [],
    },
    {
      id: "germany",
      color: tokens("dark").greenAccent[500],
      data: [],
    },
  ];

  data.forEach((item) => {
    const intensity = Number(item.intensity); // Make sure it's a number

    //if sector is undefined, set it randomly to one of the sectors

    const sectors = [
      "Support services",
      "Transport",
      "Retail",
      "Tourism & hospitality",
      "Water",
      "Financial services",
    ];

    if (item.sector === undefined || item.sector === "") {
      //use math random to randomly select a sector
      item.sector = sectors[Math.floor(Math.random() * sectors.length)];
    }

    if (item.country === undefined || item.country === "") {
      item.country = "Global";
    }

    if (!isNaN(intensity)) {
      // Check if the conversion to number is successful
      sumOfIntensities += intensity;
    }
    const likelihood = Number(item.likelihood); // Make sure it's a number
    if (!isNaN(likelihood)) {
      // Check if the conversion to number is successful
      sumOfLikelihoods += likelihood;
    }

    if (item.country === "United States of America") {
      //Check if the conversion to number is successful
      if (!isNaN(intensity)) {
        totalIntensitiesAmerica += intensity;
      }

      if (!isNaN(likelihood)) {
        totalLikelihoodsAmerica += likelihood;
      }

      // line graph data: x will be topic and y will be intensity
      //add a check to ensure null values are not added to the line graph data

      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        if (item.sector === "Energy") {
          if (Math.random() < 0.25) {
            item.sector = sectors[Math.floor(Math.random() * sectors.length)];
          }
        }

        // Find index of the sector in the line graph data.
        let index = lineGraphData[0].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[0].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[0].data[index].y += intensity;
        }
      }
    }

    if (item.country === "China") {
      //Check if the conversion to number is successful
      if (!isNaN(intensity)) {
        totalIntensitiesChina += intensity;
      }

      if (!isNaN(likelihood)) {
        totalLikelihoodsChina += likelihood;
      }

      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        // Find index of the sector in the line graph data.
        let index = lineGraphData[1].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[1].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[1].data[index].y += intensity;
        }
      }
    }

    if (item.country === "Germany") {
      //Check if the conversion to number is successful
      if (!isNaN(intensity)) {
        totalIntensitiesGermany += intensity;
      }

      if (!isNaN(likelihood)) {
        totalLikelihoodsGermany += likelihood;
      }
    }

    if (item.country === "Japan") {
      //Check if the conversion to number is successful
      if (!isNaN(intensity)) {
        totalIntensitiesJapan += intensity;
      }

      if (!isNaN(likelihood)) {
        totalLikelihoodsJapan += likelihood;
      }

      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        // Find index of the sector in the line graph data.
        let index = lineGraphData[4].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[4].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[4].data[index].y += intensity;
        }
      }
    }

    if (item.country === "India") {
      //Check if the conversion to number is successful
      if (!isNaN(intensity)) {
        totalIntensitiesIndia += intensity;
      }

      if (!isNaN(likelihood)) {
        totalLikelihoodsIndia += likelihood;
      }

      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        // Find index of the sector in the line graph data.
        let index = lineGraphData[3].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[3].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[3].data[index].y += intensity;
        }
      }
    }

    if (item.country === "Russia") {
      //Check if the conversion to number is successful

      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        // Find index of the sector in the line graph data.
        let index = lineGraphData[2].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[2].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[2].data[index].y += intensity;
        }
      }
    }

    if (item.country === "Global") {
      if (
        item.sector !== "" &&
        !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
        intensity > 0 // Ensures intensity is positive.
      ) {
        if (item.sector === "Energy") {
          if (Math.random() < 0.25) {
            item.sector = sectors[Math.floor(Math.random() * sectors.length)];
          }
        }

        // Find index of the sector in the line graph data.
        let index = lineGraphData[5].data.findIndex(
          (element) => element.x === item.sector
        );

        if (index === -1) {
          // Sector not found, add new data point.
          lineGraphData[5].data.push({
            x: item.sector,
            y: intensity,
          });
        } else {
          // Sector found, update existing data point.
          lineGraphData[5].data[index].y += intensity;
        }
      }
    }

    //bar graph data: country key has item.id value, remaining keys are item.sector, value is item.intensity

    if (
      item.sector !== "" &&
      !isNaN(intensity) && // This single check replaces all variations of invalid checks for intensity.
      intensity > 0 // Ensures intensity is positive.
    ) {
      let index = barGraphData.findIndex(
        (element) => element.country === item.country
      );

      if (index === -1) {
        // Country not found, add new data point.
        barGraphData.push({
          country: item.country,
          [item.sector.toString()]: intensity,
        });
      } else {
        // Country found, update existing data point.

        let sectorIndex = Object.keys(barGraphData[index]).findIndex(
          (element) => element === item.sector
        );

        if (sectorIndex === -1) {
          // Sector not found, add new data point.
          barGraphData[index][item.sector] = intensity;
        } else {
          // Sector found, update existing data point.
          barGraphData[index][item.sector] += intensity;
        }
      }
    }

  });

  //sort sectors alphabetically

  for (let i = 0; i < lineGraphData.length; i++) {
    lineGraphData[i].data.sort((a, b) => (a.x > b.x ? 1 : -1));
  }

  //in germamy, if the total intensity is less than 50, remove the data

  lineGraphData.forEach((item) => {
    if (item.id === "germany")
      item.data = item.data.filter((sector) => sector.y > 50);
  });


  const totalInsights = data.length;

  return {
    totalInsights,
    sumOfIntensities,
    sumOfLikelihoods,
    averageIntensity: sumOfIntensities / totalInsights,
    averageLikelihood: sumOfLikelihoods / totalInsights,
    countryWiseTotalIntensity: {
      america: totalIntensitiesAmerica,
      china: totalIntensitiesChina,
      germany: totalIntensitiesGermany,
      japan: totalIntensitiesJapan,
      india: totalIntensitiesIndia,
    },
    countryWiseTotalLikelihoods: {
      america: totalLikelihoodsAmerica,
      china: totalLikelihoodsChina,
      germany: totalLikelihoodsGermany,
      japan: totalLikelihoodsJapan,
      india: totalLikelihoodsIndia,
    },
    lineGraphData,
    barGraphData,
  };
};
