import React from "react";
import { PeriodCalendar } from "../components/calendar/calendar";
import { Box, Typography, Stack } from "@mui/material";
import { PeriodForm } from "../components/periodForm";

const Home = () => (
  <Stack alignItems={"center"}>
    <Typography variant="h4" textAlign="center" gutterBottom>
      Regl Takip Sistemi
    </Typography>

    {/* Takvim Bileşeni */}
    <Box mb={4}>
      <PeriodCalendar />
    </Box>

    {/* Regl Formu */}
    <Box mb={4}>
      <PeriodForm />
    </Box>
  </Stack>
);

export default Home;
