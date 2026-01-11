import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '@mui/material/Button';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };
  
  const handleLogin = () => {
    navigate('/login');
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          📚 Biblioteka
        </Link>
        
        <div className="navbar-menu">
          {user && (
            <Link to="/reservations" className="navbar-link">
              Moje rezerwacje
            </Link>
          )}
          
          {isAdmin() && (
            <Link to="/admin" className="navbar-link">
              Panel administratora
            </Link>
          )}
          
          {user ? (
            <div className="navbar-user">
              <span className="navbar-username">
                {user.username} {isAdmin() && '(Admin)'}
              </span>
              <Button variant="contained" onClick={handleLogout}>
                Wyloguj się
              </Button>
            </div>
          ) : (
            <div className="navbar-auth">
              <Button variant="contained" onClick={handleLogin}>
                Zaloguj
              </Button>
              <Button variant="contained" onClick={handleRegister}>
                Zarejestruj
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
