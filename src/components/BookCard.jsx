import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createReservation } from '../services/api';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './BookCard.css';

const BookCard = ({ book, onReservationChange }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const getStatusText = (status) => {
    switch(status) {
      case 'AVAILABLE':
        return 'Dostępna';
      case 'LOANED':
        return 'Wypożyczona';
      case 'RESERVED':
        return 'Zarezerwowana';
      default:
        return status;
    }
  };

  const handleReservation = async () => {
    if (!user) {
      setMessage('Musisz być zalogowany, aby zarezerwować książkę');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await createReservation(book.id);
      setMessage('Książka została zarezerwowana!');
      if (onReservationChange) {
        onReservationChange();
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Nie udało się zarezerwować książki');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-card">
      <div className="book-cover">
        <div className="book-placeholder">📖</div>
      </div>
      
      <div className="book-info">
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">Autor: {book.author}</p>
        {book.year && <p className="book-year">Rok: {book.year}</p>}
        
        <div className={`book-status`}>
          <Chip 
            label={getStatusText(book.status)} 
            color={book.status === 'AVAILABLE' ? 'success' : book.status === 'LOANED' ? 'error' : 'info'} 
            size="small" 
          />
        </div>

        {message && (
          <div className={`book-message ${message.includes('udało') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        {book.status === 'AVAILABLE' && user && (
          <Button 
            variant="contained"
            color="primary"
            onClick={handleReservation}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? 'Rezerwacja...' : 'Zarezerwuj'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
