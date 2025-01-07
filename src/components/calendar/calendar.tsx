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
import {
  Box,
  Stack,
  Tooltip,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

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
  const [open, setOpen] = useState(false); // Dialog visibility state
  const [selectedDate, setSelectedDate] = useState<Date | null>(null); // Selected date

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

  // Handle date click
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
