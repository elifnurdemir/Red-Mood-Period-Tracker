// src/components/RedmoodNavbar.js
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import './Navbar.css'
const RedmoodNavbar = ({ logo, userName, handleOpenModal }) => {
  return (
    <div className="redmood-navbar">
      <div className="navbar-left">
        <div className="navbar-logo-container">
          <img src={logo} alt="logo" />
          <div>
      
            <div className="navbar-logo-title">
              Pinky
            </div>
         
          </div>
        </div>
      </div>
      <div className="navbar-right">
        {userName !== "undefined" && (
          <div className="navbar-right-title">Hoşgeldin</div>
        )}
        <div
          className="navbar-right-value"
          onClick={handleOpenModal}
          style={{ cursor: "pointer" }}
        >
          {userName !== "undefined" ? userName : "İsimsiz şey seni"}
        </div>
        <span>  <FontAwesomeIcon icon={faHeart} /></span>
      
      </div>

      <div className="navbar-left visibility-hidden">
        <img src={logo} alt="logo" />
        <span>Red</span>Mood
      </div>
    </div>
  );
};

export default RedmoodNavbar;
