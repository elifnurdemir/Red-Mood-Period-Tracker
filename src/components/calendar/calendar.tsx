import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  format,
  addDays,
  addWeeks,
  eachDayOfInterval,
  parseISO,
} from "date-fns";
import "react-calendar/dist/Calendar.css";
import { Box, Stack, useTheme } from "@mui/material";

interface CustomDate {
  date: Date;
  emoji?: string;
  label?: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const PeriodCalendar = () => {
  const theme = useTheme(); // MUI theme hook
  const [value, onChange] = useState<Value>(new Date());
  const [customDates, setCustomDates] = useState<CustomDate[]>([]);

  useEffect(() => {
    const savedPeriods = localStorage.getItem("periods");
    const periodDuration = 5; // Regl süresi (5 gün olarak varsayıldı)
    const cycleDuration = 28; // Regl döngüsü (28 gün olarak varsayıldı)

    if (savedPeriods) {
      const periods = JSON.parse(savedPeriods);
      const newCustomDates: CustomDate[] = [];

      periods.forEach((period: { startDate: string }, index: number) => {
        const startDate = parseISO(period.startDate);

        // İlk regl dönemini hesapla
        const firstPeriodDates = eachDayOfInterval({
          start: startDate,
          end: addDays(startDate, periodDuration - 1),
        });

        firstPeriodDates.forEach((date) => {
          newCustomDates.push({
            date,
            emoji: "🩸",
            label: `Dönem ${index + 1}`,
          });
        });

        // Tahmini regl dönemlerini hesapla (örneğin 1 yıl boyunca)
        for (let i = 1; i <= 12; i++) {
          const nextCycleStart = addWeeks(startDate, i * (cycleDuration / 7));
          const nextPeriodDates = eachDayOfInterval({
            start: nextCycleStart,
            end: addDays(nextCycleStart, periodDuration - 1),
          });

          nextPeriodDates.forEach((date) => {
            newCustomDates.push({
              date,
              emoji: "🩸",
              label: `Tahmini Dönem ${index + 1 + i}`,
            });
          });
        }
      });

      setCustomDates(newCustomDates);
    }
  }, []);

  // Custom günler üzerine etiket ve emoji ekleme
  const tileContent = ({ date }: any) => {
    const customDate = customDates.find(
      (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    return customDate ? (
      <Box
        sx={{
          position: "absolute",
          top: "8px",
          right: "0px",
        }}
      >
        <div className="react-calendar-emoji">{customDate.emoji}</div>
      </Box>
    ) : null;
  };

  return (
    <Stack>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        selectRange={true}
      />
      <style>{`
        .react-calendar__tile--active {
          background: ${theme.palette.primary.light} !important;
          color: white !important;
        }
      `}</style>
    </Stack>
  );
};
