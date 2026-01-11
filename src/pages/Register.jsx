import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Auth.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Hasła nie są identyczne');
      return;
    }

    if (password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków');
      return;
    }

    setLoading(true);

    const result = await register(username, password, email);
    
    setLoading(false);
    
    if (result.success) {
      navigate('/login', { state: { message: 'Rejestracja zakończona sukcesem. Zaloguj się.' } });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Rejestracja</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              type="text"
              id="username"
              label="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              fullWidth
            />
          </div>
          
          <div className="form-group">
            <TextField
              type="email"
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              fullWidth
            />
          </div>
          
          <div className="form-group">
            <TextField
              type="password"
              id="password"
              label="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              inputProps={{ minLength: 6 }}
              fullWidth
            />
          </div>
          
          <div className="form-group">
            <TextField
              type="password"
              id="confirmPassword"
              label="Potwierdź hasło"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              fullWidth
            />
          </div>
          
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            {loading ? 'Rejestracja...' : 'Zarejestruj się'}
          </Button>
        </form>
        
        <p className="auth-link">
          Masz już konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
