import { useState, useEffect } from "react";
import { parseISO } from "date-fns";

export interface Period {
  duration: number; // Regl süresi (gün)
  startDate: string; // Regl başlangıç tarihi
}

export const usePeriods = () => {
  const [periods, setPeriods] = useState<Period[]>(() => {
    const savedPeriods = localStorage.getItem("periods");
    return savedPeriods ? JSON.parse(savedPeriods) : [];
  });

  useEffect(() => {
    // localStorage'den veriyi al ve state'i güncelle
    const savedPeriods = localStorage.getItem("periods");
    if (savedPeriods) {
      setPeriods(JSON.parse(savedPeriods));
    }
  }, []);

  const addPeriod = (newPeriod: Period) => {
    const updatedPeriods = [...periods, newPeriod];
    setPeriods(updatedPeriods);
    localStorage.setItem("periods", JSON.stringify(updatedPeriods));
  };

  const clearPeriods = () => {
    setPeriods([]);
    localStorage.removeItem("periods");
  };

  return {
    periods,
    addPeriod,
    clearPeriods,
  };
};
