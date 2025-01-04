import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import {
  format,
  addDays,
  addWeeks,
  eachDayOfInterval,
  subDays,
  parseISO,
} from "date-fns";
import "react-calendar/dist/Calendar.css";
import { Box, Stack, Tooltip, useTheme } from "@mui/material";

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
    const periodDuration = 5;
    const cycleDuration = 28;

    if (savedPeriods) {
      const periods = JSON.parse(savedPeriods);
      const newCustomDates: CustomDate[] = [];

      periods.forEach((period: { startDate: string }, index: number) => {
        const startDate = parseISO(period.startDate);

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

        // Tahmini regl dönemlerini ve doğurgan dönemleri hesapla
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
              label: `regl`,
            });
          });

          // Yumurtlama günü ve doğurgan dönem hesaplama
          const ovulationDay = addDays(nextCycleStart, cycleDuration - 12);
          const fertileStart = subDays(ovulationDay, 4);
          const fertileEnd = ovulationDay;

          const fertileDates = eachDayOfInterval({
            start: fertileStart,
            end: fertileEnd,
          });

          newCustomDates.push({
            date: ovulationDay,
            emoji: "🥚",
            label: `Yumurtlama Günü`,
          });

          fertileDates.forEach((date) => {
            newCustomDates.push({
              date,
              emoji: "💗",
              label: `Doğurgan Dönem (ovulasyon)`,
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
      <Tooltip title={customDate.label}>
        <Box
          sx={{
            position: "absolute",
            top: "8px",
            right: "0px",
          }}
          aria-label={"hey"}
        >
          <div className="react-calendar-emoji">{customDate.emoji}</div>
        </Box>
      </Tooltip>
    ) : null;
  };

  return (
    <Stack>
      <Calendar
        onChange={onChange}
        value={value}
        tileContent={tileContent}
        tileClassName="custom-tile"
      />
      <style>{`
        .react-calendar {
          background: ${theme.palette.background.default} !important;
          color: ${theme.palette.text.primary} !important; /* Metin rengini temadan al */
        }
        .react-calendar__tile--active {
          background: ${theme.palette.primary.light} !important;
          color: white !important;
        }
        .custom-tile {
          background: ${theme.palette.background.paper};
        }
        .react-calendar__tile {
          color: ${theme.palette.text.primary} !important; /* Hücre yazı rengini temadan al */
        }
        .react-calendar__tile--now {
          background: ${theme.palette.secondary.light} !important;
        }
        .react-calendar__month-view__days__day--weekend {
          color: ${theme.palette.primary.main} !important; /* Haftasonu yazı rengi */
        }
      `}</style>
    </Stack>
  );
};
