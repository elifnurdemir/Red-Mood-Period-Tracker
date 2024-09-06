import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CalendarSwiperContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDroplet } from "@fortawesome/free-solid-svg-icons";
// Function to generate all dates in the past 60 days and the next 60 days
const generateDateRange = () => {
  const today = new Date();
  const startDate = new Date(today);
  const endDate = new Date(today);

  startDate.setDate(today.getDate() - 60); // 60 gün öncesi
  endDate.setDate(today.getDate() + 60); // 60 gün sonrası

  const dates = [];
  let currentDate = startDate;

  // Helper function to reset time part of the date
  const resetTime = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const todayReset = resetTime(today);

  while (currentDate <= endDate) {
    const currentDateReset = resetTime(currentDate);

    dates.push({
      date: new Date(currentDate), // Date object
      dateName: currentDate.toLocaleDateString("tr-TR", { weekday: "short" }), // Günün adı
      dateValue: currentDate.getDate(), // Ayın gün numarası
      monthName: currentDate.toLocaleDateString("tr-TR", { month: "long" }), // Ayın adı
      state: "bleeding", // Örnek durum
      className: currentDateReset.getTime() === todayReset.getTime() ? "today" : "test", // Bugünse 'today', aksi takdirde 'test'
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};



const CalendarSwiperContainer = () => {
  const [dates, setDates] = useState([]);
  const [initialSlide, setInitialSlide] = useState(0);

  useEffect(() => {
    const dates = generateDateRange();
    setDates(dates);

    // Find the index of today's date
    const today = new Date();
    const todayIndex = dates.findIndex(
      (date) => date.date.toDateString() === today.toDateString()
    );

    if (todayIndex !== -1) {
      setInitialSlide(todayIndex);
    }
  }, []);

  return (
    <div className="calendar-swiper-container">
      <Swiper
        spaceBetween={20}
        slidesPerView={14} // Adjust the number of slides visible at once
        initialSlide={60} // Start from today's date
        slidesPerGroup={15}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        style={{ height: "100%" }} // Swiper'ın yüksekliği
      >
        {dates.map((date, index) => (
          <SwiperSlide key={index}>
            <div className={`calendar-slide ${date.className ? date.className : ''}`}>
              <div className="calendar-day-number">{date.date.getDate()}</div>
              <div className="calendar-day-name">{date.dateName}</div>
              <div><FontAwesomeIcon icon={faDroplet} /></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CalendarSwiperContainer;
