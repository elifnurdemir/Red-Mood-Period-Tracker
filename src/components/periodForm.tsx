import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useForm } from "react-hook-form";

interface Period {
  startDate: string;
  endDate: string;
}

export const PeriodForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [periods, setPeriods] = useState<Period[]>([]);

  // useForm hook'u ile formu başlatıyoruz
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Period>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Formu gönderirken yapılacak işlemler
  const onSubmit = (data: Period) => {
    const { startDate, endDate } = data;

    if (startDate && endDate) {
      const newPeriod: Period = { startDate, endDate };
      setPeriods([...periods, newPeriod]);
      localStorage.setItem("periods", JSON.stringify([...periods, newPeriod]));
      reset();

      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen} variant="contained" color="primary">
        Regl Formunu Aç
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Regl Tarihlerini Ekle</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={2}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Başlangıç Tarihi"
                type="date"
                fullWidth
                {...register("startDate", {
                  required: "Başlangıç tarihi gereklidir",
                })}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.startDate} // Hata kontrolü
                helperText={errors.startDate?.message} // Hata mesajı
              />
              <TextField
                label="Bitiş Tarihi"
                type="date"
                fullWidth
                {...register("endDate", {
                  required: "Bitiş tarihi gereklidir",
                })}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                error={!!errors.endDate} // Hata kontrolü
                helperText={errors.endDate?.message} // Hata mesajı
              />

              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Kapat
                </Button>
                <Button type="submit" color="primary" variant="contained">
                  Kaydet
                </Button>
              </DialogActions>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
