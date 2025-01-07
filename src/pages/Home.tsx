import { PeriodCalendar } from "../components/calendar/calendar";
import { Box, Typography, Stack } from "@mui/material";
import { PeriodForm } from "../components/calendar/components/periodForm";
import { useState, useEffect } from "react";
import { usePeriods, Period } from "../hooks/usePeriods";

const Home = () => {
  const { periods: hookPeriods, addPeriod } = usePeriods();
  const [periods, setPeriods] = useState<Period[]>([]);

  // Sync state periods with hook periods if state is empty
  useEffect(() => {
    if (periods.length === 0 && hookPeriods.length > 0) {
      setPeriods(hookPeriods);
    }
  }, [hookPeriods, periods]);

  // Callback to handle periods change in the parent
  const handlePeriodsChange = (newPeriods: Period[]) => {
    setPeriods(newPeriods);
    addPeriod(newPeriods[newPeriods.length - 1]); // Add the new period using the hook
  };

  return (
    <Stack alignItems={"center"}>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Regl Takip Sistemi
      </Typography>

      {/* Takvim Bileşeni */}
      <Box mb={4}>
        <PeriodCalendar periods={periods} />{" "}
        {/* Pass periods to PeriodCalendar */}
      </Box>

      {/* Regl Formu */}
      <Box mb={4}>
        <PeriodForm
          periods={periods}
          onPeriodsChange={handlePeriodsChange} // Pass onPeriodsChange to PeriodForm
        />
      </Box>
    </Stack>
  );
};

export default Home;
