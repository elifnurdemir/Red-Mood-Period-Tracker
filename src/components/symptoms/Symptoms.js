import React, { useState } from "react";
import "./Symptoms.css";
import acnePng from "../../assets/acne.png";
import crampsPng from "../../assets/cramps.png";
import headachePng from "../../assets/headache.png";
import moodswingPng from "../../assets/mood-swing.png";
import chocolatePng from "../../assets/chocolate.png";
import breastPng from "../../assets/breast.png";
import stress from "../../assets/stress.png";
import body from "../../assets/body.png";

const symptomsData = [
  { id: "headache1", label: "Baş Ağrısı", icon: headachePng },
  { id: "breast1", label: "Göğüs Hassasiyeti", icon: breastPng },
  { id: "fatigue", label: "Yorgunluk", icon: stress },
  { id: "cramps", label: "Kramplar", icon: crampsPng },
  { id: "acne", label: "Akne", icon: acnePng },
  { id: "moodswing", label: "Ruh Hali Değişiklikleri", icon: moodswingPng },
  { id: "foodcraving", label: "Yemek Yeme İsteği", icon: chocolatePng },
  { id: "body", label: "Şişkinlik", icon: body },
];

const Symptoms = () => {
  // Her semptom için durumları saklamak için bir state
  const [checkedSymptoms, setCheckedSymptoms] = useState({});

  const handleSymptomClick = (id) => {
    setCheckedSymptoms((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className="symptoms-container">
      <div className="symptoms-title">Semptomlar</div>
      <div className="symptoms">
        {symptomsData.map((symptom) => (
          <div
            className={`symptom-option ${
              checkedSymptoms[symptom.id] ? "checked" : ""
            }`}
            key={symptom.id}
            onClick={() => handleSymptomClick(symptom.id)}
          >
            <input
              type="checkbox"
              id={symptom.id}
              checked={!!checkedSymptoms[symptom.id]}
              readOnly
              style={{ display: "none" }} // Checkbox'ı gizle
            />
            <img
              src={symptom.icon}
              alt={symptom.label}
              className="symptom-icon"
            />
            <label htmlFor={symptom.id}>{symptom.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Symptoms;
