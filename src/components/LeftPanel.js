import React, { useState, useEffect, useCallback } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import useIndexedDB from '../hooks/useIndexedDB';

function LeftPanel({ selectedStory, setSelectedStory }) {
  const [stories, setStories] = useState([]);
  const [newStoryTitle, setNewStoryTitle] = useState('');
  const [editingStory, setEditingStory] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);
  const { getAll, add, update, remove } = useIndexedDB('stories');

  const loadStories = async () => {
    const loadedStories = await getAll();
    setStories(loadedStories);
  };

  useEffect(() => {
    loadStories();
  }, [loadStories]);

  const handleAddStory = async () => {
    if (newStoryTitle.trim()) {
      const newStory = { title: newStoryTitle.trim(), paragraphs: [] };
      await add(newStory);
      setNewStoryTitle('');
      loadStories();
    }
  };

  const handleEditStory = async (story) => {
    if (editingStory && editingStory.id === story.id) {
      await update({ ...story, title: editingStory.title });
      setEditingStory(null);
      loadStories();
    } else {
      setEditingStory({ ...story });
    }
  };

  const handleDeleteStory = (story) => {
    setStoryToDelete(story);
    setDeleteConfirmOpen(true);
  };

  const confirmDeleteStory = async () => {
    if (storyToDelete) {
      await remove(storyToDelete.id);
      setDeleteConfirmOpen(false);
      setStoryToDelete(null);
      if (selectedStory && selectedStory.id === storyToDelete.id) {
        setSelectedStory(null);
      }
      loadStories();
    }
  };

  return (
    <Box sx={{ height: '100%', overflowY: 'auto', borderRight: 1, borderColor: 'divider' }}>
      <List>
        {stories.map((story) => (
          <ListItem
            key={story.id}
            secondaryAction={
              <>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEditStory(story)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteStory(story)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            {editingStory && editingStory.id === story.id ? (
              <TextField
                value={editingStory.title}
                onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
                onBlur={() => handleEditStory(story)}
                autoFocus
                fullWidth
              />
            ) : (
              <ListItemText
                primary={story.title}
                onClick={() => setSelectedStory(story)}
                sx={{ cursor: 'pointer' }}
              />
            )}
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <TextField
          label="New Story Title"
          value={newStoryTitle}
          onChange={(e) => setNewStoryTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={handleAddStory}
          fullWidth
        >
          Add Story
        </Button>
      </Box>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this story? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDeleteStory} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default LeftPanel;