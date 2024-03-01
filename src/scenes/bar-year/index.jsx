import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import { parseBarGraphDataVsYear } from "../../utils/parseBarDataVsYear";
import { useEffect, useState } from "react";
import axios from "axios";
import { parsedCountryList } from "../../utils/parseCountryList";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const BarYear = () => {
  var parsedData = [];

  const [filteredData, setFilteredData] = useState([]);

  const [country, setCountry] = React.useState("India");

  //using axios to get data from the server, then parsing it, then filtering it to get the data for the current country
  
  useEffect(() => {
    console.log("useEffect entered")
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        parsedData = parseBarGraphDataVsYear(response.data);
        console.log("BarYearVsGraphData: ", parsedData);
        setFilteredData(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Box m="20px">
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={handleChange}
        >
          {parsedCountryList.map((country, index) => (
            <MenuItem key={index} value={country}>
              {country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box height="75vh">
        <BarChart
          isBarVsYear={true}
          propData={filteredData}
          country={country}
        />
      </Box>
    </Box>
  );
};

export default BarYear;
