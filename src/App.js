import React, { useState, useEffect } from "react";
import "./App.css";
import logo from "./assets/rose.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import UserModal from "./components/UserModal";
import Sidebar from "./components/SideBar";
import RedmoodNavbar from "./components/navbar/RedmoodNavbar";
import Chart from "./components/chart/Chart.js";
import VerticalWrapper from "./components/utils/VerticalWrapper.js";
import HorizontalWrapper from "./components/utils/HorizontalWrapper.js";
import Page from "./components/page/Page.js";
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      const storedName = localStorage.getItem("userName");
      if (!storedName) {
        setIsModalOpen(true); // Show modal if there's no name in local storage
      } else {
        setUserName(storedName);
      }
    }
  }, [isModalOpen]);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSaveUserName = (name) => {
    setUserName(name);
  };



  return (
    <div className="redmood-container">
      <UserModal
        isOpen={isModalOpen}
        onClose={() => handleCloseModal()}
        onSave={handleSaveUserName}
      />
      <VerticalWrapper>
        <RedmoodNavbar
          logo={logo}
          userName={userName}
          handleOpenModal={handleOpenModal}
        />
        <HorizontalWrapper>
          <Sidebar />

          <Page />
        </HorizontalWrapper>
      </VerticalWrapper>
    </div>
  );
}

export default App;
