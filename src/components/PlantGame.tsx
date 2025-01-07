import React, { useState, useEffect } from "react";

const PlantGame: React.FC = () => {
  const [growthStage, setGrowthStage] = useState<number>(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);

  const handleWater = () => {
    if (growthStage < 3) {
      setGrowthStage((prevStage) => prevStage + 1);
    } else {
      alert("Bitkin tam büyüdü, harika iş!");
    }
  };

  const toggleMusic = () => {
    const bgMusic = document.getElementById("bg-music") as HTMLAudioElement;
    if (isMusicPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const getPlantImage = (): string => {
    switch (growthStage) {
      case 1:
        return "https://via.placeholder.com/100x100.png?text=Seedling";
      case 2:
        return "https://via.placeholder.com/150x150.png?text=Growing";
      case 3:
        return "https://via.placeholder.com/200x200.png?text=Bloomed";
      default:
        return "https://via.placeholder.com/100x100.png?text=Seedling";
    }
  };

  useEffect(() => {
    const bgMusic = document.getElementById("bg-music") as HTMLAudioElement;
    bgMusic.play();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        height: "100%",
        width: "25%",
        backgroundColor: "#f0f8f7",
        padding: "20px",
        textAlign: "center",
        borderLeft: "2px solid #c1e2d5",
      }}
    >
      <h3>Bitkini Büyüt</h3>
      <div
        style={{
          position: "relative",
          height: "300px",
          border: "2px solid #c1e2d5",
          borderRadius: "10px",
          background: "white",
          overflow: "hidden",
          marginBottom: "20px",
        }}
      >
        <img
          src={getPlantImage()}
          alt="Plant"
          style={{
            width: "50px",
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <button
        onClick={handleWater}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#91c8ac",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Su Ver
      </button>
      <button
        onClick={toggleMusic}
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          padding: "10px 20px",
          backgroundColor: isMusicPlaying ? "#f08080" : "#91c8ac",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {isMusicPlaying ? "Müziği Durdur" : "Müziği Başlat"}
      </button>
      <audio id="bg-music" loop>
        <source
          src="https://www.fesliyanstudios.com/play-mp3/387"
          type="audio/mpeg"
        />
        Tarayıcınız sesi desteklemiyor.
      </audio>
    </div>
  );
};

export default PlantGame;
