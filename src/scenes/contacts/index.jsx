import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useMemo } from "react"; // Import useMemo for data transformation
import { useState } from "react"; 
import { useEffect } from "react";
import axios from "axios";



const Insights = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [pageSize, setPageSize] = useState(10);

  var parsedData = [];

  const [filteredData, setFilteredData] = useState([]);

  //using axios to get data from the server, then parsing it, then filtering it to get the data for the current country
  var insightsData = [];
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        parsedData = response.data;
        setFilteredData(parsedData);
        console.log("parsedData: ", parsedData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //in filterData, rename the _id key to id

  const finalRenderingData = filteredData.map((item, index) => {
    return { ...item, id: index };
  });



  // Transform the provided data to fit the DataGrid
  const transformedData = useMemo(() => finalRenderingData.map((item, index) => ({
    id: index,
    sector: item.sector || "Not specified", // Provide a default value if sector is empty
    topic: item.topic || "Not specified",
    intensity: item.intensity || 0,
    insight: item.insight,
    country: item.country || "Global", // Default to "Global" if country is empty
    relevance: item.relevance || 0,
    likelihood: item.likelihood || 0,
    impact: item.impact || 0, 
    url: item.url,
  })), [insightsData]);

  const columns = [
    { field: "sector", headerName: "Sector", flex: 1 },
    { field: "topic", headerName: "Topic", flex: 1 },
    { field: "intensity", headerName: "Intensity", type: "number", flex: 0.5 },
    { field: "insight", headerName: "Insight", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "relevance", headerName: "Relevance", type: "number", flex: 0.5 },
    { field: "likelihood", headerName: "Likelihood", type: "number", flex: 0.5 },
    { field: "impact", headerName: "Impact", flex: 1 },
    {
      field: "url",
      headerName: "URL",
      flex: 1,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="INSIGHTS" subtitle="Insights on Global Oil Demand and Use" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={transformedData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)} // Update pageSize state on change
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          pagination
          sx={{
            // Existing styles
            '& .MuiDataGrid-toolbarContainer': {
              backgroundColor: colors.grey[200], // Adjust this color as needed
              color: colors.primary.main, // Adjust text color as needed for visibility
            },
            // Other custom styles
            '& .MuiDataGrid-cell': {
              borderBottom: "none",
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            '& .MuiDataGrid-virtualScroller': {
              backgroundColor: colors.primary[400],
            },
            '& .MuiDataGrid-footerContainer': {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Insights;
