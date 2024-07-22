import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useIndexedDB from '../hooks/useIndexedDB';

function RightPanel({ selectedStory, colorTemp, fontSize }) {
  const [paragraphs, setParagraphs] = useState([]);
  const [newParagraph, setNewParagraph] = useState('');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [paragraphToDelete, setParagraphToDelete] = useState(null);
  const { update } = useIndexedDB();

  useEffect(() => {
    if (selectedStory) {
      setParagraphs(selectedStory.paragraphs || []);
    } else {
      setParagraphs([]);
    }
  }, [selectedStory]);

  const handleAddParagraph = () => {
    if (newParagraph.trim() && selectedStory) {
      const updatedParagraphs = [...paragraphs, newParagraph.trim()];
      setParagraphs(updatedParagraphs);
      update({ ...selectedStory, paragraphs: updatedParagraphs });
      setNewParagraph('');
    }
  };

  const handleDeleteParagraph = (index) => {
    setParagraphToDelete(index);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteParagraph = () => {
    if (paragraphToDelete !== null && selectedStory) {
      const updatedParagraphs = paragraphs.filter((_, i) => i !== paragraphToDelete);
      setParagraphs(updatedParagraphs);
      update({ ...selectedStory, paragraphs: updatedParagraphs });
      setDeleteConfirmOpen(false);
      setParagraphToDelete(null);
    }
  };

  const colorTemperatureToRGB = (kelvin) => {
    let temp = kelvin / 100;
    let red, green, blue;
  
    if (temp <= 66) {
      red = 255;
      green = Math.max(0, Math.min(255, 99.4708025861 * Math.log(temp) - 161.1195681661));
      blue = temp <= 19 ? 0 : Math.max(0, Math.min(255, 138.5177312231 * Math.log(temp - 10) - 305.0447927307));
    } else {
      red = Math.max(0, Math.min(255, 329.698727446 * Math.pow(temp - 60, -0.1332047592)));
      green = Math.max(0, Math.min(255, 288.1221695283 * Math.pow(temp - 60, -0.0755148492)));
      blue = 255;
    }
  
    return `rgb(${Math.round(red)}, ${Math.round(green)}, ${Math.round(blue)})`;
  };

  const getBgColor = () => {
    return colorTemperatureToRGB(colorTemp);
  };

  return (
    <Box sx={{ height: '100%', backgroundColor: getBgColor(), p: 2, overflowY: 'auto' }}>
      {selectedStory ? (
        <>
          <Typography variant="h4" gutterBottom>
            {selectedStory.title}
          </Typography>
          <List>
            {paragraphs.map((paragraph, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteParagraph(index)}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <Typography
                  sx={{
                    fontSize: `${fontSize}px`,
                    fontWeight: 'bold',
                    WebkitTextFillColor: 'black',
                  }}
                >
                  {paragraph}
                </Typography>
              </ListItem>
            ))}
          </List>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="New Paragraph"
              multiline
              rows={4}
              value={newParagraph}
              onChange={(e) => setNewParagraph(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              onClick={handleAddParagraph}
              fullWidth
            >
              Add Paragraph
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6">Select a story from the left panel</Typography>
      )}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this paragraph? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteParagraph} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default RightPanel;