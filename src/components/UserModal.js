import React, { useState, useEffect } from "react";
import { Modal } from "paradise-mud-modal";
import "paradise-mud-modal/src/paradise-mud-modal.css";
import "paradise-mud-modal/src/paradise-mud-modal-dark.css";
import "paradise-mud-modal/src/paradise-mud-modal-light.css";

function UserModal({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState(undefined);
  console.log(isOpen);
  useEffect(() => {
    setInputValue(localStorage.getItem("userName", inputValue));
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSave = (type) => {
    if (type === "delete") {
      localStorage.setItem("userName", undefined);
    } else {
      localStorage.setItem("userName", inputValue);
    }

    onClose();
  };

  return (
    <Modal
      title={"Adınızı girin"}
      isOpen={isOpen}
      onClose={onClose}
      theme="dark"
      size="medium"
      position="centered"
      actions={[
        {
          label: "Sil",
          onClick: () => handleSave("delete"),
          type: "secondary",
        },
        { label: "Kaydet", onClick: () => handleSave("save"), type: "primary" },
      ]}
    >
      <input
        className="modal-input"
        type="text"
        value={inputValue === "undefined" ? '' : inputValue}
        onChange={handleInputChange}
        placeholder={"Enter your name (optional)"}
      />
    </Modal>
  );
}

export default UserModal;
