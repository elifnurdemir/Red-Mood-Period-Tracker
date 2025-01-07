import React, { useEffect, useState } from "react";
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
import { usePeriods, Period } from "../../../hooks/usePeriods";

export const PeriodForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { periods, addPeriod } = usePeriods(); // Hook'tan `addPeriod` fonksiyonu ve periodlar
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Period>();

  useEffect(() => {
    if (periods.length === 0) {
      setOpen(true); // Eğer kayıtlı period yoksa, dialog açılır
    }
  }, [periods]);

  const handleClose = () => setOpen(false);

  const onSubmit = (data: Period) => {
    addPeriod(data); // Yeni regl dönemini ekler
    reset();
    setOpen(false);
  };

  return (
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
              defaultValue={5}
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
  );
};
