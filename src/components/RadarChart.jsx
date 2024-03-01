import { ResponsiveRadar } from "@nivo/radar";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";

const RadarChart = ({ isDashboard = false, data,country }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

//   console.log("radarGraphData: ", radarGraphData);

  // filter the data based on the country

  const radarGraphData = data;

  const filteredData = radarGraphData.filter(
    (dataPoint) => dataPoint.country === country.toString()
  );

  if(filteredData.length === 0) return null;

  //reduce filteredData[0].data to 3 sectors

  if(filteredData[0].data.length > 10) filteredData[0].data = filteredData[0].data.slice(0, 5);


  //reduce energy sector values by 50%

  let energyIndex = filteredData[0].data.findIndex(
    (element) => element.sector === "Energy"
  );

  if (energyIndex !== -1) {
    filteredData[0].data[energyIndex].intensity =
      filteredData[0].data[energyIndex].intensity / 2;
  }

  if(filteredData[0].data.length > 5) filteredData[0].data = filteredData[0].data.slice(0, 5);

  console.log("Filtered radarGraphData.data: ", filteredData[0].data);


  return (
    <ResponsiveRadar
      data={filteredData[0].data}
      keys={["intensity", "likelihood", "impact"]}
      indexBy="sector"
      valueFormat=">-.2f"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      borderColor={colors.grey[100]}
      gridLabelOffset={36}
      dotSize={10}
      dotColor={{ theme: "background" }}
      dotBorderWidth={2}
      colors={{ scheme: "nivo" }}
      blendMode="multiply"
      motionConfig="wobbly"
      legends={[
        {
          anchor: "top-left",
          direction: "column",
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: "#999",
          symbolSize: 12,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RadarChart;
