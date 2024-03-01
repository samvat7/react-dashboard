import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme.js"; // Assuming this is a JS file
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrafficIcon from "@mui/icons-material/Traffic";
import PublicIcon from "@mui/icons-material/Public";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import Header from "../../components/Header.jsx";
import LineChart from "../../components/LineChart.jsx";
import GeographyChart from "../../components/GeographyChart.jsx";
import BarChart from "../../components/BarChart.jsx";
import StatBox from "../../components/StatBox.jsx";
import { useState, useEffect } from "react"; // Combined import
import { parseInsightsData } from "../../utils/parseInsightsData.js"; // Assuming this is a JS file
// import { blackcofferData as data } from "../../data/blackcofferData.js";
import axios from "axios";
import { geoGraphData } from "../../utils/parseGeoData.js";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const countryCodes = {
    america: "US",
    china: "CN",
    germany: "DE",
    japan: "JP",
    india: "IN",
    global: "GLOBAL",
    // Add more mappings as needed
  };

  function countryCodeToFlagEmoji(countryCode) {
    if (countryCode === "GLOBAL") {
      return "🌍"; // Return a global emoji or another representation for "GLOBAL"
    }
    const base = 127397; // Base code point for regional indicator symbols
    const flag = [...countryCode.toUpperCase()]
      .map((char) => String.fromCodePoint(char.charCodeAt() + base))
      .join("");
    return flag;
  }

  const [insightsData, setInsightsData] = useState({
    totalInsights: 0,
    sumOfIntensities: 0,
    sumOfLikelihoods: 0,
    averageIntensity: 0,
    averageLikelihood: 0,
    countryWiseTotalIntensities: {},
    countryWiseTotalLikelihoods: {},
    lineGraphData: [],
    barGraphData: [],
  });


  // fetch data from the backend

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        const parsedData = parseInsightsData(response.data);
        setInsightsData(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentCountryIndex, setCurrentCountryIndex] = useState(0);
  const countryNames = ["america", "china", "germany", "japan", "india"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentCountryIndex(
        (prevIndex) => (prevIndex + 1) % countryNames.length
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const filteredData = insightsData.lineGraphData.filter(
    (item) => item.id === countryNames[currentCountryIndex]
  );

  var filteredBarGraphData = insightsData.barGraphData.filter(
    (item) =>
      item.country === "United States of America" ||
      item.country === "Russia" ||
      item.country === "Iran" ||
      item.country === "Saudi Arabia" ||
      item.country === "India"
  );

  const [filteredGeoData, setFilteredGeoData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/data")
      .then((response) => {
        const parsedGeoData = geoGraphData(response.data);
        console.log("parsedGeoData: ", parsedGeoData);
        setFilteredGeoData(parsedGeoData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <TrafficIcon sx={{ mr: "10px" }} />
            View Traffic
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {/* Make a StaxBox that cycles through each country's contribution to totalIntensity */}

          <StatBox
            title={insightsData.averageIntensity.toFixed(2)}
            subtitle="Average Intensity"
            progress="0.60"
            increase="+20%"
            //icon should be the globe emoji and size should be 50px
            icon={
              <PublicIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={insightsData.averageLikelihood.toFixed(2)}
            subtitle="Average Likelihood"
            progress="0.60"
            increase="+20%"
            icon={
              <TravelExploreIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${
              insightsData.countryWiseTotalIntensity &&
              insightsData.countryWiseTotalIntensity[
                countryNames[currentCountryIndex]
              ] !== undefined
                ? insightsData.countryWiseTotalIntensity[
                    countryNames[currentCountryIndex]
                  ].toFixed(0)
                : "Loading..."
            } Intensity`}
            subtitle={`${
              countryCodes[countryNames[currentCountryIndex]]
                ? countryCodeToFlagEmoji(
                    countryCodes[countryNames[currentCountryIndex]]
                  )
                : ""
            }
            ${
              countryNames[currentCountryIndex].charAt(0).toUpperCase() +
              countryNames[currentCountryIndex].slice(1)
            } Contribution`}
            progress={
              insightsData.countryWiseTotalIntensity &&
              insightsData.countryWiseTotalIntensity[
                countryNames[currentCountryIndex]
              ] !== undefined
                ? (
                    insightsData.countryWiseTotalIntensity[
                      countryNames[currentCountryIndex]
                    ] / insightsData.sumOfIntensities
                  ).toFixed(2)
                : "0.00"
            }
            increase={
              insightsData.countryWiseTotalIntensity &&
              insightsData.countryWiseTotalIntensity[
                countryNames[currentCountryIndex]
              ] !== undefined
                ? (
                    (insightsData.countryWiseTotalIntensity[
                      countryNames[currentCountryIndex]
                    ] /
                      insightsData.sumOfIntensities) *
                    100
                  ).toFixed(2) + "%"
                : "0.00"
            }
            icon={
              <LightbulbIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${
              insightsData.countryWiseTotalLikelihoods &&
              insightsData.countryWiseTotalLikelihoods[
                countryNames[(currentCountryIndex + 1) % countryNames.length]
              ] !== undefined
                ? insightsData.countryWiseTotalLikelihoods[
                    countryNames[
                      (currentCountryIndex + 1) % countryNames.length
                    ]
                  ].toFixed(0)
                : "Loading..."
            } Likelihood`}
            subtitle={`${
              countryCodes[
                countryNames[(currentCountryIndex + 1) % countryNames.length]
              ]
                ? countryCodeToFlagEmoji(
                    countryCodes[
                      countryNames[
                        (currentCountryIndex + 1) % countryNames.length
                      ]
                    ]
                  )
                : ""
            }
            ${
              countryNames[(currentCountryIndex + 1) % countryNames.length]
                .charAt(0)
                .toUpperCase() +
              countryNames[
                (currentCountryIndex + 1) % countryNames.length
              ].slice(1)
            } Contribution`}
            progress={
              insightsData.countryWiseTotalLikelihoods &&
              insightsData.countryWiseTotalLikelihoods[
                countryNames[(currentCountryIndex + 1) % countryNames.length]
              ] !== undefined
                ? (
                    insightsData.countryWiseTotalLikelihoods[
                      countryNames[
                        (currentCountryIndex + 1) % countryNames.length
                      ]
                    ] / insightsData.sumOfLikelihoods
                  ).toFixed(2)
                : "0.00"
            }
            increase={
              insightsData.countryWiseTotalLikelihoods &&
              insightsData.countryWiseTotalLikelihoods[
                countryNames[(currentCountryIndex + 1) % countryNames.length]
              ] !== undefined
                ? (
                    (insightsData.countryWiseTotalLikelihoods[
                      countryNames[
                        (currentCountryIndex + 1) % countryNames.length
                      ]
                    ] /
                      insightsData.sumOfLikelihoods) *
                    100
                  ).toFixed(2) + "%"
                : "0.00"
            }
            icon={
              <ShowChartIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Cummalative Intensity
              </Typography>
              <Typography
                variant="h1"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {countryNames[currentCountryIndex] === "germany" ? (
                  <>{countryCodeToFlagEmoji("GLOBAL")} Global </>
                ) : (
                  <>
                    {countryCodeToFlagEmoji(
                      countryCodes[countryNames[currentCountryIndex]]
                    )}
                  </>
                )}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart
              isDashboard={true}
              data={filteredData}
              country={countryNames[currentCountryIndex]}
              
            />
          </Box>
        </Box>
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} propData={filteredBarGraphData} />
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geographic Distribution
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} data={filteredGeoData}/>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
