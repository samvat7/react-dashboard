const countryNameToCode =  {
  Afghanistan: "AFG",
  Angola: "AGO",
  Albania: "ALB",
  "United Arab Emirates": "ARE",
  Argentina: "ARG",
  Armenia: "ARM",
  Antarctica: "ATA",
  "French Southern and Antarctic Lands": "ATF",
  Australia: "AUT",
  Azerbaijan: "AZE",
  Burundi: "BDI",
  Belgium: "BEL",
  Benin: "BEN",
  "Burkina Faso": "BFA",
  Bangladesh: "BGD",
  Bulgaria: "BGR",
  "The Bahamas": "BHS",
  "Bosnia and Herzegovina": "BIH",
  Belarus: "BLR",
  Belize: "BLZ",
  Bolivia: "BOL",
  Brazil: "BRN",
  Bhutan: "BTN",
  Botswana: "BWA",
  "Central African Republic": "CAF",
  Canada: "CAN",
  Switzerland: "CHE",
  Chile: "CHL",
  China: "CHN",
  "Ivory Coast": "CIV",
  Cameroon: "CMR",
  "Democratic Republic of the Congo": "COD",
  "Republic of the Congo": "COG",
  Colombia: "COL",
  "Costa Rica": "CRI",
  Cuba: "CUB",
  "Northern Cyprus": "-99",
  Cyprus: "CYP",
  "Czech Republic": "CZE",
  Germany: "DEU",
  Djibouti: "DJI",
  Denmark: "DNK",
  "Dominican Republic": "DOM",
  Algeria: "DZA",
  Ecuador: "ECU",
  Egypt: "EGY",
  Eritrea: "ERI",
  Spain: "ESP",
  Estonia: "EST",
  Ethiopia: "ETH",
  Finland: "FIN",
  Fiji: "FJI",
  "Falkland Islands": "FLK",
  France: "FRA",
  Gabon: "GAB",
  "United Kingdom": "GBR",
  Georgia: "GEO",
  Ghana: "GHA",
  Guinea: "GIN",
  Gambia: "GMB",
  "Guinea Bissau": "GNB",
  "Equatorial Guinea": "GNQ",
  Greece: "GRC",
  Greenland: "GRL",
  Guatemala: "GTM",
  "French Guiana": "GUF",
  Guyana: "GUY",
  Honduras: "HND",
  Croatia: "HRV",
  Haiti: "HTI",
  Hungary: "HUN",
  Indonesia: "IDN",
  India: "IND",
  Ireland: "IRL",
  Iran: "IRN",
  Iraq: "IRQ",
  Iceland: "ISL",
  Israel: "ISR",
  Italy: "ITA",
  Jamaica: "JAM",
  Jordan: "JOR",
  Japan: "JPN",
  Kazakhstan: "KAZ",
  Kenya: "KEN",
  Kyrgyzstan: "KGZ",
  Cambodia: "KHM",
  "South Korea": "KOR",
  Kosovo: "XKX",
  Kuwait: "KWT",
  Laos: "LAO",
  Lebanon: "LBN",
  Liberia: "LBR",
  Libya: "LBY",
  "Sri Lanka": "LKA",
  Lesotho: "LSO",
  Lithuania: "LTU",
  Luxembourg: "LUX",
  Latvia: "LVA",
  Morocco: "MAR",
  Moldova: "MDA",
  Madagascar: "MDG",
  Mexico: "MEX",
  Macedonia: "MKD",
  Mali: "MLI",
  Myanmar: "MMR",
  Montenegro: "MNE",
  Mongolia: "MNG",
  Mozambique: "MOZ",
  Mauritania: "MRT",
  Malawi: "MWI",
  Malaysia: "MYS",
  Namibia: "NAM",
  "New Caledonia": "NCL",
  Niger: "NER",
  Nigeria: "NGA",
  Nicaragua: "NIC",
  Netherlands: "NLD",
  Norway: "NOR",
  Nepal: "NPL",
  "New Zealand": "NZL",
  Oman: "OMN",
  Pakistan: "PAK",
  Panama: "PAN",
  Peru: "PER",
  Philippines: "PHL",
  "Papua New Guinea": "PNG",
  Poland: "POL",
  "Puerto Rico": "PRI",
  "North Korea": "PRK",
  Portugal: "PRT",
  Paraguay: "PRY",
  Qatar: "QAT",
  Romania: "ROU",
  Russia: "RUS",
  Rwanda: "RWA",
  "Western Sahara": "ESH",
  "Saudi Arabia": "SAU",
  Sudan: "SDN",
  "South Sudan": "SSD",
  Senegal: "SEN",
  "Solomon Islands": "SLB",
  "Sierra Leone": "SLE",
  "El Salvador": "SLV",
  Somaliland: "SOM",
  Somalia: "SOM",
  "Republic of Serbia": "SRB",
  Suriname: "SUR",
  Slovakia: "SVK",
  Slovenia: "SVN",
  Sweden: "SWE",
  Swaziland: "SWZ",
  Syria: "SYR",
  Chad: "TCD",
  Togo: "TGO",
  Thailand: "THA",
  Tajikistan: "TJK",
  Turkmenistan: "TKM",
  "East Timor": "TLS",
  "Trinidad and Tobago": "TTO",
  Tunisia: "TUN",
  Turkey: "TUR",
  Taiwan: "TWN",
  "United Republic of Tanzania": "TZA",
  Uganda: "UGA",
  Ukraine: "UKR",
  Uruguay: "URY",
  "United States of America": "USA",
  Uzbekistan: "UZB",
  Venezuela: "VEN",
  Vietnam: "VNM",
  Vanuatu: "VUT",
  "West Bank": "PSE",
  Yemen: "YEM",
  "South Africa": "ZAF",
  Zambia: "ZMB",
  Zimbabwe: "ZWE",
  // Add more mappings as needed
};

export const geoGraphData = (data) => {

  var geoGraphData = [];
  
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

  let country = countryNameToCode[item.country];

  if (country === undefined) {
    item.country = "Global";
  }

  let index = geoGraphData.findIndex((element) => {
    return element.id === country;
  });

  if (index === -1) {
    index = geoGraphData.length;
    geoGraphData.push({
      id: country,
      value: 0,
    });
  }

  // add the item.data.intensity to value
  geoGraphData[index].value += intensity;
});

return geoGraphData;
}
