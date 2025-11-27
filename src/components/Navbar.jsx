import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">📦 Logistics</Link>
        </li>
        {user && (
          <>
            <li>
              <span style={{ color: '#ecf0f1' }}>
                Welcome, {user.fullName} ({user.role})
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: '#e74c3c',
                  padding: '0.5rem 1rem',
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
