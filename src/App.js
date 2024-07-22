import React, { useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [colorTemp, setColorTemp] = useState(6500);
  const [fontSize, setFontSize] = useState(24);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Layout
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        colorTemp={colorTemp}
        setColorTemp={setColorTemp}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
    </ThemeProvider>
  );
}

export default App;