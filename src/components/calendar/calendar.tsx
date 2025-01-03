import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import { Box, Stack } from "@mui/material";

interface CustomDate {
  date: Date;
  emoji?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const PeriodCalendar = () => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null); // Tarih aralığı
  const [value, onChange] = useState<Value>(new Date());
  const [customDates, setCustomDates] = useState<CustomDate[]>([
    {
      date: new Date(2025, 1, 1),
      emoji: "🩸",
    },
    {
      date: new Date(2025, 0, 8),
      emoji: "🚀",
    },
    {
      date: new Date(2025, 0, 10),
      emoji: "🥚",
    },
    {
      date: new Date(2025, 0, 18),
      emoji: "😡",
    },
  ]);

  // Custom günler üzerine etiket ve emoji ekleme
  const tileContent = ({ date, view }: any) => {
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
        value={value} // Burada tarih aralığını kullanıyoruz
        tileContent={tileContent}
        selectRange={true} // Kullanıcı tarih aralığı seçebilsin
      />
    </Stack>
  );
};
