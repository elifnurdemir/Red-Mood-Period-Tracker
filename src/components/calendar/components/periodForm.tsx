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
  const { period, setNewPeriod } = usePeriods();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Period>();

  useEffect(() => {
    if (!period) {
      setOpen(true);
    }
  }, [period]);

  const handleClose = () => setOpen(false);

  const onSubmit = (data: Period) => {
    setNewPeriod(data);
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
              defaultValue={period?.duration || 5}
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
            defaultValue={period?.startDate || ""}
            {...register("startDate", {
              required: "Başlangıç tarihi gereklidir",
            })}
            InputLabelProps={{ shrink: true }}
            error={!!errors.startDate}
            helperText={errors.startDate?.message}
          />

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isDirty}
            >
              Kaydet
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
