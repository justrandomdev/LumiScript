// src/components/ColorTempSlider.js
import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

function ColorTempSlider({ colorTemp, setColorTemp }) {
  return (
    <Box>
      <Typography id="color-temp-slider" gutterBottom>
        Color Temperature
      </Typography>
      <Slider
        value={colorTemp}
        onChange={(_, newValue) => setColorTemp(newValue)}
        aria-labelledby="color-temp-slider"
        valueLabelDisplay="auto"
        step={100}
        marks
        min={3200}
        max={6500}
      />
    </Box>
  );
}

export default ColorTempSlider;