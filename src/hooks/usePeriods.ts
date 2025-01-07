import { useState, useEffect } from "react";

export interface Period {
  duration: number; // Regl süresi (gün)
  startDate: string; // Regl başlangıç tarihi
}

export const usePeriods = () => {
  const [period, setPeriod] = useState<Period | null>(() => {
    const savedPeriod = localStorage.getItem("period");
    return savedPeriod ? JSON.parse(savedPeriod) : null;
  });

  useEffect(() => {
    const savedPeriod = localStorage.getItem("period");
    if (savedPeriod) {
      setPeriod(JSON.parse(savedPeriod));
    }
  }, []);

  const setNewPeriod = (newPeriod: Period) => {
    setPeriod(newPeriod);
    localStorage.setItem("period", JSON.stringify(newPeriod));
  };

  const clearPeriod = () => {
    setPeriod(null);
    localStorage.removeItem("period");
  };

  return {
    period,
    setNewPeriod,
    clearPeriod,
  };
};
