import React, { useEffect, useState } from "react";
import {
  format,
  eachDayOfInterval,
  addDays,
  addWeeks,
  subDays,
} from "date-fns";
import "react-calendar/dist/Calendar.css";
import { Period } from "../../hooks/usePeriods"; // Assuming Period is a type that you already use for the periods
import Calendar from "react-calendar";
import {
  Box,
  Stack,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  useTheme,
} from "@mui/material";

interface CustomDate {
  date: Date;
  emoji?: string;
  label?: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface PeriodCalendarProps {
  periods?: Period[]; // Make periods optional
}

export const PeriodCalendar: React.FC<PeriodCalendarProps> = ({
  periods = [],
}) => {
  const [value, onChange] = useState<Value>(new Date()); // Seçilen tarih
  const [customDates, setCustomDates] = useState<CustomDate[]>([]); // Özel günler
  const [open, setOpen] = useState(false); // Dialog görünürlüğü
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Seçilen tarih
  const theme = useTheme();

  useEffect(() => {
    if (periods.length === 0) return; // If periods is empty, exit early

    const periodDuration = 5; // Regl süresi (gün olarak)
    const cycleDuration = 28; // Döngü süresi (gün olarak)

    const newCustomDates: CustomDate[] = []; // Takvimde gösterilecek özel günler

    periods.forEach((period: Period, index: number) => {
      const startDate = new Date(period.startDate);

      // İlk regl dönemi tarihlerini oluştur
      const firstPeriodDates = eachDayOfInterval({
        start: startDate,
        end: addDays(startDate, periodDuration - 1),
      });

      firstPeriodDates.forEach((date) => {
        newCustomDates.push({
          date,
          emoji: "🩸", // Regl dönemi simgesi
          label: `Dönem ${index + 1}`,
        });
      });

      // Takip eden regl dönemi ve doğurgan dönem hesaplamaları
      for (let i = 1; i <= 12; i++) {
        const nextCycleStart = addWeeks(startDate, i * (cycleDuration / 7));
        const nextPeriodDates = eachDayOfInterval({
          start: nextCycleStart,
          end: addDays(nextCycleStart, periodDuration - 1),
        });

        nextPeriodDates.forEach((date) => {
          newCustomDates.push({
            date,
            emoji: "🩸", // Regl dönemi simgesi
            label: `Regl ${i}`,
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
          emoji: "🥚", // Yumurtlama günü simgesi
          label: `Yumurtlama Günü`,
        });

        fertileDates.forEach((date) => {
          newCustomDates.push({
            date,
            emoji: "💗", // Doğurgan dönem simgesi
            label: `Doğurgan Dönem (Ovulasyon)`,
          });
        });
      }
    });

    setCustomDates(newCustomDates); // Yeni tarihleri set et
  }, [periods]); // periods değiştiğinde tekrar hesaplanacak

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
        >
          <div className="react-calendar-emoji">{customDate.emoji}</div>
        </Box>
      </Tooltip>
    ) : null;
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedDate(null);
  };

  return (
    <Stack>
      <Calendar
        onChange={(value) => {
          onChange(value);
          if (value && !Array.isArray(value)) {
            handleDateClick(value);
          }
        }}
        value={value}
        tileContent={tileContent}
        tileClassName="custom-tile"
      />

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Tarih Detayları</DialogTitle>
        <DialogContent>
          {selectedDate && (
            <p>Seçilen Tarih: {format(selectedDate, "dd MMMM yyyy")}</p>
          )}
          <Button
            variant="outlined"
            color="primary"
            sx={{ marginRight: 2, marginTop: 2 }}
          >
            Regl Oldum
          </Button>
          <Button variant="outlined" color="secondary" sx={{ marginTop: 2 }}>
            Regl Bitişi
          </Button>
          <Box sx={{ marginTop: 4 }}>
            <p>Modunuzu seçin:</p>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                😊
                <span style={{ fontSize: "12px", marginTop: "4px" }}>
                  Mutlu
                </span>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                😢
                <span style={{ fontSize: "12px", marginTop: "4px" }}>
                  Üzgün
                </span>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                😡
                <span style={{ fontSize: "12px", marginTop: "4px" }}>
                  Sinirli
                </span>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 2,
                }}
              >
                😴
                <span style={{ fontSize: "12px", marginTop: "4px" }}>
                  Yorgun
                </span>
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Kapat</Button>
        </DialogActions>
      </Dialog>

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
