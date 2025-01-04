import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  Slider,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { useForm, Controller } from "react-hook-form";

interface Period {
  duration: number; // Regl süresi (gün)
  startDate: string; // Regl başlangıç tarihi
}

export const PeriodForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [periods, setPeriods] = useState<Period[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Period>();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data: Period) => {
    const { duration, startDate } = data;

    if (duration && startDate) {
      const newPeriod: Period = { duration, startDate };
      setPeriods([...periods, newPeriod]);
      localStorage.setItem("periods", JSON.stringify([...periods, newPeriod]));
      reset();
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Box display="flex" justifyContent="center" mt={3}>
        <Button onClick={handleClickOpen} variant="contained" color="primary">
          Regl Formunu Aç
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle align="center" sx={{ fontWeight: "bold", pb: 0 }}>
          Regl Süresi ve Başlangıç Tarihini Ekle
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            display="flex"
            flexDirection="column"
            gap={4}
            mt={2}
          >
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Regl Kaç Gün Sürüyor? (3-10 gün)
              </Typography>
              <Controller
                name="duration"
                control={control}
                defaultValue={5} // Varsayılan regl süresi
                rules={{
                  required: "Regl süresi gereklidir",
                  validate: (value) =>
                    (value >= 3 && value <= 10) ||
                    "Süre 3 ile 10 gün arasında olmalıdır",
                }}
                render={({ field }) => (
                  <Slider
                    {...field}
                    valueLabelDisplay="auto"
                    min={3}
                    max={10}
                    step={1}
                    marks
                  />
                )}
              />
              {errors.duration && (
                <Typography color="error" variant="caption">
                  {errors.duration.message}
                </Typography>
              )}
            </Box>

            <TextField
              label="Başlangıç Tarihi"
              type="date"
              fullWidth
              {...register("startDate", {
                required: "Başlangıç tarihi gereklidir",
              })}
              InputLabelProps={{ shrink: true }}
              error={!!errors.startDate}
              helperText={errors.startDate?.message}
            />

            <DialogActions sx={{ justifyContent: "space-between", pt: 2 }}>
              <Button onClick={handleClose} color="primary">
                Kapat
              </Button>
              <Button type="submit" color="primary" variant="contained">
                Kaydet
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};
