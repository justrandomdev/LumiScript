// src/components/FontSizeSlider.js
import React from 'react';
import { Slider, Typography, Box } from '@mui/material';

function FontSizeSlider({ fontSize, setFontSize }) {
  return (
    <Box>
      <Typography id="font-size-slider" gutterBottom>
        Font Size
      </Typography>
      <Slider
        value={fontSize}
        onChange={(_, newValue) => setFontSize(newValue)}
        aria-labelledby="font-size-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={10}
        max={60}
      />
    </Box>
  );
}

export default FontSizeSlider;