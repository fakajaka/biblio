import { useState, useEffect } from 'react';
import { getUserReservations, cancelReservation } from '../services/api';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import './Reservations.css';

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      const data = await getUserReservations();
      setReservations(data);
      setError('');
    } catch (err) {
      setError('Nie udało się pobrać rezerwacji');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm('Czy na pewno chcesz anulować tę rezerwację?')) {
      return;
    }

    try {
      await cancelReservation(id);
      loadReservations();
    } catch (err) {
      alert('Nie udało się anulować rezerwacji');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="loading-container">Ładowanie rezerwacji...</div>;
  }

  if (error) {
    return <div className="error-container">{error}</div>;
  }

  return (
    <div className="reservations-container">
      <h1>Moje rezerwacje</h1>

      {reservations.length === 0 ? (
        <div className="no-reservations">
          <p>Nie masz żadnych aktywnych rezerwacji</p>
        </div>
      ) : (
        <div className="reservations-list">
          {reservations.map(reservation => (
            <div key={reservation.id} className="reservation-card">
              <div className="reservation-info">
                <h3>{reservation.book?.title || 'Nieznana książka'}</h3>
                <p className="reservation-author">
                  Autor: {reservation.book?.author || 'Nieznany'}
                </p>
                <p className="reservation-date">
                  Data rezerwacji: {new Date(reservation.reservationDate).toLocaleDateString('pl-PL')}
                </p>
                <div className={`reservation-status status-${reservation.status}`}>
                  <Chip 
                    label={reservation.status === 'AVAILABLE' ? 'Aktywna' : reservation.status === 'LOANED' ? 'Wypożyczona' : reservation.status === 'CANCELLED' ? 'Anulowana' : 'Zakończona'} 
                    color={reservation.status === 'AVAILABLE' ? 'primary' : 'default'} 
                    size="small" 
                  />
                </div>
              </div>
              
              {reservation.status === 'AVAILABLE' && (
                <Button 
                  variant="outlined"
                  color="error"
                  onClick={() => handleCancel(reservation.id)}
                >
                  Anuluj rezerwację
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reservations;
