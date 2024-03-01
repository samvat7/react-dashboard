import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseInsightsData } from "../../utils/parseInsightsData";


const Bar = () => {

  const [filteredBarGraphData, setFilteredBarGraphData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        const parsedData = parseInsightsData(response.data);
        const barGraphData = parsedData.barGraphData;

        setFilteredBarGraphData(
          barGraphData.filter(
            (item) =>
              item.country === "United States of America" ||
              item.country === "Russia" ||
              item.country === "Iran" ||
              item.country === "Saudi Arabia" ||
              item.country === "India"
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart propData={filteredBarGraphData} />
      </Box>
    </Box>
  );
};

export default Bar;
