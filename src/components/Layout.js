import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Grid, IconButton, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import ThemeToggle from './ThemeToggle';
import ColorTempSlider from './ColorTempSlider';
import FontSizeSlider from './FontSizeSlider';

function Layout({ isDarkMode, toggleTheme, colorTemp, setColorTemp, fontSize, setFontSize }) {
  const [isLeftPanelOpen, setIsLeftPanelOpen] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);

  const toggleLeftPanel = () => {
    console.log('Before toggle, isLeftPanelOpen:', isLeftPanelOpen);
    setIsLeftPanelOpen(prevState => {
      console.log('Toggling, new state will be:', !prevState);
      return !prevState;
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleLeftPanel}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Prompt Wizard
          </Typography>
          <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </Toolbar>
      </AppBar>
      <Grid container sx={{ flexGrow: 1, overflow: 'hidden' }}>
        {isLeftPanelOpen && (
          <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
            <LeftPanel selectedStory={selectedStory} setSelectedStory={setSelectedStory} />
          </Grid>
        )}
        <Grid item xs={12} sm={isLeftPanelOpen ? 9 : 12} md={isLeftPanelOpen ? 9 : 12} lg={isLeftPanelOpen ? 9 : 12} xl={isLeftPanelOpen ? 9 : 12}>
          <RightPanel
            selectedStory={selectedStory}
            colorTemp={colorTemp}
            fontSize={fontSize}
          />
        </Grid>
      </Grid>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ColorTempSlider colorTemp={colorTemp} setColorTemp={setColorTemp} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FontSizeSlider fontSize={fontSize} setFontSize={setFontSize} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="body2" align="right">
              © 2024 Prompt Wizard. Created by Shaun Tame
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Layout;
