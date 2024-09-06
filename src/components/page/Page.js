import React, { useState, useEffect, useRef } from "react";
import Chart from "../chart/Chart.js";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import "./Page.css";
import CalendarSwiperContainer from "./CalendarSwiperContainer.js";

import Symptoms from "../symptoms/Symptoms.js";
const Page = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });

  const swiperRef = useRef(null);

  const chartData = [
    { keyword: "Part 1", value: 6, empty: false, color: "#F2536F" },
    { keyword: "Spacer 1", value: 3, empty: true, color: "transparent" },
    { keyword: "Part 2", value: 8, empty: false, color: "#F3C6DE" },
    { keyword: "Spacer 2", value: 4, empty: true, color: "transparent" },
    {
      keyword: "Allah Belani Versin Mert Part",
      value: 7,
      empty: false,
      color: "#F0A19E",
    },
    { keyword: "Spacer 3", value: 2, empty: true, color: "transparent" },
  ];

  const partValue = 6; // Part verilerinin değeri
  const spacerValue = 10; // Spacer verilerinin değeri
  const partColor = "#36A2EB"; // Part verilerinin rengi
  const spacerColor = "transparent"; // Spacer verilerinin rengi

  const chartDataInner = Array(56) // 16 veri, her biri Part veya Spacer olacak
    .fill(null)
    .map((_, i) => {
      if (i % 2 === 0) {
        // Part verileri
        return {
          keyword: `Part ${i / 2 + 1}`,
          value: partValue,
          empty: false,
          color: "#444",
        };
      } else {
        // Spacer verileri
        return {
          keyword: `Spacer ${Math.floor(i / 2) + 1}`,
          value: spacerValue,
          empty: true,
          color: "transparent",
        };
      }
    });

  const handleAddEvent = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ title: "", start: new Date(), end: new Date() });
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  const handleDateChange = (date, field) => {
    setNewEvent({
      ...newEvent,
      [field]: date,
    });
  };

  const handleDateClick = (info) => {
    const title = prompt("Etkinlik başlığını girin:");
    if (title) {
      setEvents([...events, { title, date: info.dateStr }]);
    }
  };

  const getCurrentDateInfo = () => {
    const today = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    return today.toLocaleDateString("tr-TR", options);
  };

  const days = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString("tr-TR", {
      weekday: "short",
      day: "numeric",
    });
  });

  return (
    <div className="dashboard-container">
      <div className="swiper-container">
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          style={{ height: "100%" }} // Swiper'ın yüksekliği
        >
          <SwiperSlide
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <CalendarSwiperContainer />
          </SwiperSlide>
          <SwiperSlide
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="day-left-container">
              <div className="day-left-value">20</div>
              <div className="day-left-title">Gün Kaldı</div>
              <div class="button-container">
                <a href="#" class="button type--C">
                  <div class="button__line"></div>
                  <div class="button__line"></div>
                  <span class="button__text">Regl Oldum!</span>
                  <div class="button__drow1"></div>
                  <div class="button__drow2"></div>
                </a>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
          <Symptoms/>

          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Page;
