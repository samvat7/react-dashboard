
// object structure, radarGraphData[0]:
// {
// country: "usa",
// data: {
// sector: "energy",
// intensity: 20
// likelihood: 30
// impact: 40
// }

export const parseRadarData = (data) => {

  var radarGraphData = [];

data.forEach((item) => {
  item.intensity = Number(item.intensity);
  item.likelihood = Number(item.likelihood);
  item.impact = Number(item.impact);

  if (item.intensity === undefined || item.intensity === "") {
    item.intensity = 0;
  }

  if (item.likelihood === undefined || item.likelihood === "") {
    item.likelihood = 0;
  }

  if (item.impact === undefined || item.impact === "") {
    item.impact = 0;
  }

  if(item.country === undefined || item.country === "") {
    item.country = "Global";
  }

  let countryIndex = radarGraphData.findIndex(
    (element) => element.country === item.country
  );

  if (countryIndex === -1) {
    radarGraphData.push({
      country: item.country,
      data: [
        {
          sector: item.sector.toString(),
          intensity: item.intensity,
          likelihood: item.likelihood,
          impact: item.impact,
        },
      ],
    });
  } else {
    let sectorIndex = radarGraphData[countryIndex].data.findIndex(
      (element) => element.sector === item.sector
    );

    if (sectorIndex === -1) {
      radarGraphData[countryIndex].data.push({
        sector: item.sector.toString(),
        intensity: item.intensity,
        likelihood: item.likelihood,
        impact: item.impact,
      });
    } else {
      radarGraphData[countryIndex].data[sectorIndex].intensity +=
        item.intensity;
      radarGraphData[countryIndex].data[sectorIndex].likelihood +=
        item.likelihood;
      radarGraphData[countryIndex].data[sectorIndex].impact += item.impact;
    }
  }
});

//multiply impact values by 10

radarGraphData.forEach((country) => {
  console.log(country)
  if(country !== "Global")
  country.data.forEach((sector) => {
    sector.impact = sector.impact * 10;
  });
});

return radarGraphData;
}
