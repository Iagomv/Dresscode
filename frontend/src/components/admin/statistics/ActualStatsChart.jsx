import React, { useEffect, useState } from "react";
import { ApiConfig } from "../../../api/ApiConfig";
import { Grid, CircularProgress, Typography } from "@mui/material";
import StatisticsPieChart from "./StatisticsPieChart";
import { priorityColors, statusColors } from "../../../utils/IncidentUtils";

const ActualStatsChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiConfig.getActualStatsData();
        setChartData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getColorByLabel = (label, type) => {
    if (type === "priority") {
      return priorityColors[label];
    } else if (type === "status") {
      return statusColors[label];
    }
    return "#000000";
  };

  const prepareChartData = (labels, data, type) => {
    return labels.map((label, index) => ({
      name: label,
      value: data[index],
      fill: getColorByLabel(label, type),
    }));
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {chartData.length === 2 && (
        <>
          <Grid item xs={12} sm={6}>
            <StatisticsPieChart
              data={prepareChartData(
                chartData[0].labels,
                chartData[0].data,
                "priority"
              )}
              title="Incident Priority Distribution"
              paddingAngle={5}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <StatisticsPieChart
              data={prepareChartData(
                chartData[1].labels,
                chartData[1].data,
                "status"
              )}
              title="Incident Status Distribution"
              paddingAngle={5}
            />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default ActualStatsChart;
