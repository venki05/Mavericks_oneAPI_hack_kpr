import DashboardBox from "@/components/DashboardBox";
import FlexBetween from "@/components/FlexBetween";
import { useGetKpisQuery } from "@/state/api";
import { Box, Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useMemo, useState } from "react";
import {
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Row1 from "./Row1";

// Grid template for large screens (2x2 grid)
const gridTemplateLargeScreens = `
  "a b"
  "c d"
`;

// Grid template for small screens (1x4 grid)
const gridTemplateSmallScreens = `
  "a"
  "b"
  "c"
  "d"
`;

const Dashboard = () => {
  const isAboveMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box
      width="100%"
      height="100%"
      display="grid"
      gap="1.5rem"
      sx={
        isAboveMediumScreens
          ? {
              gridTemplateColumns: "repeat(2, minmax(370px, 1fr))", // 2 columns
              gridTemplateRows: "repeat(2, minmax(60px, 1fr))", // 2 rows
              gridTemplateAreas: gridTemplateLargeScreens, // 2x2 layout
            }
          : {
              gridAutoColumns: "1fr",
              gridAutoRows: "80px",
              gridTemplateAreas: gridTemplateSmallScreens, // 1x4 layout
            }
      }
    >
      <Row1 />
    </Box>
  );
};

export default Dashboard;

