import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData } from "../data/mockData";
import { useEffect, useState } from "react";
import axios from "axios";
import { parseInsightsData } from "../utils/parseInsightsData";

const BarChart = ({ isDashboard = false, isBarVsYear, propData, country }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
    // Prepare data based on isBarVsYear flag
    let finalRenderingData = [];
    if (isBarVsYear) {
      // Find the data for the specific country
      const countryData = propData.find(
        (dataPoint) => dataPoint.country === country
      );
      // Use the country-specific data if available, otherwise, default to an empty array
      finalRenderingData = countryData ? countryData.data : [];
    } else {
      // If not isBarVsYear, use propData directly
      finalRenderingData = propData;
    }
  
    console.log("[Bar Vs Year]data being rendered: ", finalRenderingData);
    console.log("isBarVsYear: ", isBarVsYear);
  

  
  return (
    <ResponsiveBar
      data={finalRenderingData} // changed
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      keys={[
        "Energy",
        "Manufacturing",
        "Agriculture",
        "Transport",
        "Residential",
        "Financial services",
      ]}
      indexBy={isBarVsYear ? "id" : "country"} // changed
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isBarVsYear ? "id" : "country", // changed
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend:  "intensity", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;
