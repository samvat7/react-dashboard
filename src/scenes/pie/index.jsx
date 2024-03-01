import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import RadarChart from "../../components/RadarChart";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { parsedCountryList } from "../../utils/parseCountryList";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseInsightsData } from "../../utils/parseInsightsData";
import { parseRadarData } from "../../utils/parseRadarData";


const Pie = () => {

 const [country, setCountry] = React.useState('India');

  const handleChange = (event) => {
    setCountry(event.target.value);
  }

  var parsedData = [];

  const [filteredData, setFilteredData] = useState([]);

  //using axios to get data from the server, then parsing it, then filtering it to get the data for the current country

  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        parsedData = parseRadarData(response.data);
        setFilteredData(parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
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
            <MenuItem key={index} value={country}>{country}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box height="75vh">
        <RadarChart isDashboard={false} data={filteredData} country={country} />
      </Box>
    </Box>
  );
};

export default Pie;
