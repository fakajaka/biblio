import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import './BookForm.css';

const BookForm = ({ book, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    year: '',
    status: 'AVAILABLE'
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        year: book.year || '',
        status: book.status || 'AVAILABLE'
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="book-form-overlay">
      <div className="book-form">
        <h3>{book ? 'Edytuj książkę' : 'Dodaj nową książkę'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              type="text"
              id="title"
              name="title"
              label="Tytuł"
              value={formData.title}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <div className="form-group">
            <TextField
              type="text"
              id="author"
              name="author"
              label="Autor"
              value={formData.author}
              onChange={handleChange}
              required
              fullWidth
            />
          </div>

          <div className="form-group">
            <TextField
              type="number"
              id="year"
              name="year"
              label="Rok wydania"
              value={formData.year}
              onChange={handleChange}
              inputProps={{ min: 1000, max: 2100 }}
              fullWidth
            />
          </div>

          <div className="form-group">
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="AVAILABLE">Dostępna</MenuItem>
                <MenuItem value="LOANED">Wypożyczona</MenuItem>
                <MenuItem value="RESERVED">Zarezerwowana</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-actions">
            <Button type="button" variant="outlined" onClick={onCancel}>
              Anuluj
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Zapisz
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;
