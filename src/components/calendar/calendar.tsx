import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
interface CustomDate {
  date: Date;
  label?: string;
  emoji?: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const PeriodCalendar = () => {
  const [dateRange, setDateRange] = useState<[Date, Date] | null>(null); // Tarih aralığı
  const [value, onChange] = useState<Value>(new Date());
  const [customDates, setCustomDates] = useState<CustomDate[]>([
    {
      date: new Date(2025, 0, 5), // Örnek tarih
      label: "Meeting",
      emoji: "📅",
    },
    {
      date: new Date(2025, 0, 10),
      label: "Birthday",
      emoji: "🎉",
    },
  ]);

  // Custom günler üzerine etiket ve emoji ekleme
  const tileContent = ({ date, view }: any) => {
    const customDate = customDates.find(
      (item) => format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );

    return customDate ? (
      <div>
        <div>{customDate.emoji}</div>
        <div>{customDate.label}</div>
      </div>
    ) : null;
  };

  return (
    <div>
      <h1>Custom Calendar</h1>
      <Calendar
        onChange={onChange}
        value={value} // Burada tarih aralığını kullanıyoruz
        tileContent={tileContent}
        selectRange={true} // Kullanıcı tarih aralığı seçebilsin
      />
      <div>
        <p>
          {dateRange
            ? `Selected Range: ${format(
                dateRange[0],
                "yyyy-MM-dd"
              )} to ${format(dateRange[1], "yyyy-MM-dd")}`
            : "No range selected"}
        </p>
      </div>
    </div>
  );
};
