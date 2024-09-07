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
  const [showModal, setShowModal] = useState(false);

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
          <SwiperSlide
            style={{
              height: "839px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Symptoms />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Page;
