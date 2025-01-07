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

interface PeriodFormProps {
  periods: Period[];
  onPeriodsChange: (newPeriods: Period[]) => void; // Callback to parent
}

export const PeriodForm: React.FC<PeriodFormProps> = ({
  periods,
  onPeriodsChange,
}) => {
  const [open, setOpen] = useState(false);
  const { addPeriod } = usePeriods(); // Hook'tan `addPeriod` fonksiyonu
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm<Period>();

  useEffect(() => {
    // Check if there are periods in localStorage
    const savedPeriods = localStorage.getItem("periods");
    if (!savedPeriods || JSON.parse(savedPeriods).length === 0) {
      setOpen(true); // If no periods in localStorage, open the dialog
    }
  }, []);

  const handleClose = () => setOpen(false);

  // Update parent with the new periods after form submission
  const onSubmit = (data: Period) => {
    addPeriod(data); // Yeni regl dönemini ekler
    const updatedPeriods = [...periods, data]; // Update the periods array with the new period
    onPeriodsChange(updatedPeriods); // Send the updated periods to the parent
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

          <DialogActions>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={!isDirty} // Disable the button only when the form is not dirty
            >
              Kaydet
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
