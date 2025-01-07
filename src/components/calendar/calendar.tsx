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

interface LocalPeriod {
  duration: number; // Regl süresi (gün)
  startDate: string; // Regl başlangıç tarihi (YYYY-MM-DD)
}

export const PeriodCalendar: React.FC<{ period: LocalPeriod | null }> = ({
  period,
}) => {
  const [value, onChange] = useState<Value>(new Date()); // Seçilen tarih
  const [customDates, setCustomDates] = useState<CustomDate[]>([]); // Özel günler
  const [open, setOpen] = useState(false); // Dialog görünürlüğü
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Seçilen tarih
  const theme = useTheme();

  useEffect(() => {
    if (!period) return;

    const { duration, startDate } = period;
    const cycleDuration = 28; // Regl döngüsü uzunluğu (28 gün)
    const start = new Date(startDate);
    const newCustomDates: CustomDate[] = [];

    // İlk regl dönemi günleri
    const firstPeriodDays = eachDayOfInterval({
      start,
      end: addDays(start, duration - 1),
    });

    firstPeriodDays.forEach((date) =>
      newCustomDates.push({ date, emoji: "🩸", label: "Regl Dönemi" })
    );

    // Gelecek 12 döngüyü hesapla
    for (let i = 1; i <= 12; i++) {
      const nextCycleStart = addWeeks(start, i * (cycleDuration / 7));

      // Gelecek regl dönemi günleri
      const nextPeriodDays = eachDayOfInterval({
        start: nextCycleStart,
        end: addDays(nextCycleStart, duration - 1),
      });

      nextPeriodDays.forEach((date) =>
        newCustomDates.push({ date, emoji: "🩸", label: "Regl Dönemi" })
      );

      // Yumurtlama ve doğurganlık dönemi
      const ovulationDay = addDays(nextCycleStart, cycleDuration - 12);
      const fertileStart = subDays(ovulationDay, 4);
      const fertileEnd = ovulationDay;

      const fertileDays = eachDayOfInterval({
        start: fertileStart,
        end: fertileEnd,
      });

      newCustomDates.push({
        date: ovulationDay,
        emoji: "🥚",
        label: "Yumurtlama Günü",
      });

      fertileDays.forEach((date) =>
        newCustomDates.push({ date, emoji: "💗", label: "Doğurgan Dönem" })
      );
    }

    setCustomDates(newCustomDates);
  }, [period]);

  const renderTileContent = ({ date }: { date: Date }) => {
    const customDate = customDates.find(
      (d) => format(d.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    if (customDate) {
      return (
        <Tooltip title={customDate.label}>
          <span>{customDate.emoji}</span>
        </Tooltip>
      );
    }
    return null;
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
        tileContent={renderTileContent}
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
