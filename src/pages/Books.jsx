import { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import './Books.css';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Nie udało się pobrać książek');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || book.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return <div className="loading-container">Ładowanie książek...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="books-container">
      <div className="books-header">
        <h1>Katalog książek</h1>
        
        <div className="books-filters">
          <TextField
            type="text"
            placeholder="Szukaj po tytule lub autorze..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
          />
          
          <FormControl size="small">
            <InputLabel id="filter-label">Filtruj</InputLabel>
            <Select
              labelId="filter-label"
              value={filterStatus}
              label="Filtruj"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <MenuItem value="all">Wszystkie</MenuItem>
              <MenuItem value="AVAILABLE">Dostępne</MenuItem>
              <MenuItem value="LOANED">Wypożycone</MenuItem>
              <MenuItem value="RESERVED">Zarezerwowane</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="no-results">
          Nie znaleziono książek spełniających kryteria wyszukiwania
        </div>
      ) : (
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} onReservationChange={loadBooks} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
