# Mini Logistics Platform - React Frontend Complete Code

## FRONTEND STRUCTURE & CODE EXPLANATION

### Project Structure
```
logistics-delivery-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── AdminDashboard/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AssignDriver.jsx
│   │   │   └── DeliveryList.jsx
│   │   ├── BusinessUserDashboard/
│   │   │   ├── BusinessDashboard.jsx
│   │   │   ├── CreateDelivery.jsx
│   │   │   └── TrackDelivery.jsx
│   │   └── DriverDashboard/
│   │       ├── DriverDashboard.jsx
│   │       ├── AcceptDelivery.jsx
│   │       └── UpdateStatus.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── index.css
│   └── index.js
├── package.json
└── .env
```

---

### 1. PACKAGE.JSON - Project Dependencies

```json
{
  "name": "logistics-delivery-frontend",
  "version": "1.0.0",
  "description": "Mini Logistics and Delivery Management Platform - React Frontend",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.2",
    "axios": "^1.4.0",
    "react-scripts": "5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

**Dependencies Explanation:**
- `react`: UI library for building components
- `react-router-dom`: Client-side routing
- `axios`: HTTP client for API calls

---

### 2. .ENV - Environment Configuration

```properties
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_TIMEOUT=10000
```

---

### 3. PUBLIC/INDEX.HTML - Main HTML File

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
        name="description"
        content="Mini Logistics and Delivery Management Platform"
    />
    <title>Logistics & Delivery Management</title>
</head>
<body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <!-- React root element -->
    <div id="root"></div>
</body>
</html>
```

---

### 4. SRC/INDEX.JS - Application Entry Point

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Create root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render App wrapped with AuthProvider for authentication context
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
```

**Explanation:**
- `ReactDOM.createRoot`: Creates React root for rendering
- `AuthProvider`: Wraps app to provide authentication context to all components

---

### 5. SRC/INDEX.CSS - Global Styles

```css
/* Global styling for the entire application */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f5f5;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Navigation styling */
nav {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: #3498db;
}

/* Container styling */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Card styling */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 1.5rem;
}

/* Form styling */
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

input,
select,
textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3);
}

/* Button styling */
button {
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table thead {
  background-color: #34495e;
  color: white;
}

table th,
table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

table tr:hover {
  background-color: #ecf0f1;
}

/* Badge/Status styling */
.badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.badge-pending {
  background-color: #f39c12;
  color: white;
}

.badge-accepted {
  background-color: #3498db;
  color: white;
}

.badge-on-way {
  background-color: #9b59b6;
  color: white;
}

.badge-delivered {
  background-color: #27ae60;
  color: white;
}

.badge-cancelled {
  background-color: #e74c3c;
  color: white;
}

/* Alert styling */
.alert {
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
}

.alert-error {
  background-color: #fadbd8;
  color: #c0392b;
  border: 1px solid #e74c3c;
}

.alert-success {
  background-color: #d5f4e6;
  color: #27ae60;
  border: 1px solid #27ae60;
}

.alert-info {
  background-color: #d6eaf8;
  color: #2980b9;
  border: 1px solid #3498db;
}

/* Loading spinner */
.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 2rem auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  nav ul {
    flex-direction: column;
    gap: 1rem;
  }

  table {
    font-size: 0.875rem;
  }

  table th,
  table td {
    padding: 0.5rem;
  }
}
```

---

### 6. SRC/CONTEXT/AUTHCONTEXT.JSX - Authentication Context

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create authentication context
const AuthContext = createContext();

// AuthProvider component that wraps the app
export const AuthProvider = ({ children }) => {
  // State for storing user data
  const [user, setUser] = useState(null);
  
  // State for storing JWT token
  const [token, setToken] = useState(null);
  
  // State for tracking loading status
  const [loading, setLoading] = useState(true);

  // Initialize authentication from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  /**
   * Login function
   * Stores token and user in state and localStorage
   */
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  };

  /**
   * Logout function
   * Clears token and user from state and localStorage
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Context value object
  const value = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * Usage: const { user, token, login, logout } = useAuth();
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

**Explanation:**
- `createContext`: Creates context object for sharing auth state
- `useAuth`: Custom hook to access auth context from any component
- Token and user are persisted in localStorage to survive page refreshes

---

### 7. SRC/SERVICES/API.JS - API Communication

```javascript
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: parseInt(process.env.REACT_APP_TIMEOUT),
});

/**
 * Axios interceptor to add JWT token to requests
 * Runs before every API call
 */
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Add token to Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Axios interceptor to handle responses
 * Runs after every API response
 */
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If token is invalid/expired, logout user
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Authentication API endpoints
 */
export const authApi = {
  // Register new user
  register: (data) =>
    api.post('/auth/register', data),
  
  // Login user
  login: (data) =>
    api.post('/auth/login', data),
};

/**
 * User API endpoints
 */
export const userApi = {
  // Get all drivers
  getAllDrivers: () =>
    api.get('/users/drivers'),
  
  // Get user by ID
  getUserById: (id) =>
    api.get(`/users/${id}`),
};

/**
 * Delivery API endpoints
 */
export const deliveryApi = {
  // Create new delivery
  createDelivery: (data) =>
    api.post('/deliveries', data),
  
  // Get delivery by ID
  getDeliveryById: (id) =>
    api.get(`/deliveries/${id}`),
  
  // Get all deliveries (filtered by role)
  getAllDeliveries: () =>
    api.get('/deliveries'),
  
  // Assign driver to delivery
  assignDriver: (deliveryId, driverId) =>
    api.put(`/deliveries/${deliveryId}/assign-driver/${driverId}`),
  
  // Update delivery status
  updateDeliveryStatus: (deliveryId, data) =>
    api.put(`/deliveries/${deliveryId}/status`, data),
};

export default api;
```

**Explanation:**
- Interceptors automatically add JWT token to all requests
- Handles 401 errors by redirecting to login
- Centralized API calls for easy maintenance

---

### 8. SRC/COMPONENTS/PROTECTEDROUTE.JSX - Route Protection

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * ProtectedRoute component
 * Restricts access to authenticated users only
 * Redirects unauthenticated users to login
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return <div className="spinner"></div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render protected component
  return children;
};

export default ProtectedRoute;
```

---

### 9. SRC/COMPONENTS/NAVBAR.JSX - Navigation Bar

```javascript
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Navbar component
 * Displays navigation links and logout button
 */
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Handle logout
   * Clears auth state and redirects to login
   */
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
```

---

### 10. SRC/PAGES/LOGIN.JSX - Login Page

```javascript
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authApi } from '../services/api';

/**
 * Login page component
 * Allows users to authenticate with email and password
 */
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form input changes
   * Updates state as user types
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    setError('');
  };

  /**
   * Handle form submission
   * Sends login request to backend
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call
      const response = await authApi.login(formData);
      const { token, user } = response.data;

      // Store auth data
      login(token, user);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      // Display error message
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          Login to Logistics Platform
        </h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: '1rem' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Don't have account?{' '}
          <a href="/register" style={{ color: '#3498db' }}>
            Register here
          </a>
        </p>

        {/* Demo credentials */}
        <div className="alert alert-info" style={{ marginTop: '1rem' }}>
          <strong>Demo Credentials:</strong>
          <br />
          Admin: admin@test.com / admin123
          <br />
          Business: business@test.com / business123
          <br />
          Driver: driver@test.com / driver123
        </div>
      </div>
    </div>
  );
};

export default Login;
```

---

### 11. SRC/PAGES/REGISTER.JSX - Registration Page

```javascript
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

/**
 * Register page component
 * Allows new users to create accounts
 */
const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    role: 'BUSINESS_USER',
  });

  // UI state
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call
      const response = await authApi.register(formData);
      const { token, user } = response.data;

      // Store auth data
      login(token, user);

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: '500px', margin: '2rem auto' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          Create Account
        </h2>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password (min 6 chars)</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              minLength="6"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="BUSINESS_USER">Business User</option>
              <option value="DRIVER">Driver</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <p style={{ marginTop: '1rem', textAlign: 'center' }}>
          Already have account?{' '}
          <a href="/login" style={{ color: '#3498db' }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
```

---

### 12. SRC/PAGES/DASHBOARD.JSX - Main Dashboard

```javascript
import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import BusinessDashboard from '../components/BusinessUserDashboard/BusinessDashboard';
import DriverDashboard from '../components/DriverDashboard/DriverDashboard';

/**
 * Dashboard component
 * Routes to appropriate dashboard based on user role
 */
const Dashboard = () => {
  const { user } = useAuth();

  // Show appropriate dashboard based on role
  if (user?.role === 'ADMIN') {
    return <AdminDashboard />;
  } else if (user?.role === 'BUSINESS_USER') {
    return <BusinessDashboard />;
  } else if (user?.role === 'DRIVER') {
    return <DriverDashboard />;
  }

  return <div className="container">Loading...</div>;
};

export default Dashboard;
```

---

### 13. SRC/COMPONENTS/ADMINDASHBOARD/ADMINDASHBOARD.JSX

```javascript
import React, { useState, useEffect } from 'react';
import { deliveryApi, userApi } from '../../services/api';
import DeliveryList from './DeliveryList';
import AssignDriver from './AssignDriver';

/**
 * Admin Dashboard
 * Shows all deliveries and allows driver assignment
 */
const AdminDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  // Load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  /**
   * Load deliveries and drivers
   */
  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const [deliveriesRes, driversRes] = await Promise.all([
        deliveryApi.getAllDeliveries(),
        userApi.getAllDrivers(),
      ]);

      setDeliveries(deliveriesRes.data);
      setDrivers(driversRes.data);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle driver assignment
   */
  const handleAssignDriver = async (driverId) => {
    try {
      await deliveryApi.assignDriver(selectedDelivery.id, driverId);
      // Reload data
      loadData();
      setSelectedDelivery(null);
    } catch (err) {
      setError('Failed to assign driver');
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h2>All Deliveries</h2>
          <DeliveryList
            deliveries={deliveries}
            onSelectDelivery={setSelectedDelivery}
          />
        </div>

        {selectedDelivery && (
          <div>
            <h2>Assign Driver</h2>
            <AssignDriver
              delivery={selectedDelivery}
              drivers={drivers}
              onAssign={handleAssignDriver}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
```

---

### 14. SRC/COMPONENTS/ADMINDASHBOARD/DELIVERYLIST.JSX

```javascript
import React from 'react';

/**
 * DeliveryList component
 * Displays deliveries in a table format
 */
const DeliveryList = ({ deliveries, onSelectDelivery }) => {
  const getStatusBadge = (status) => {
    const badgeClass = `badge badge-${status.toLowerCase()}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No deliveries found
              </td>
            </tr>
          ) : (
            deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.pickupAddress.substring(0, 20)}...</td>
                <td>{delivery.dropAddress.substring(0, 20)}...</td>
                <td>{getStatusBadge(delivery.status)}</td>
                <td>{delivery.priority}</td>
                <td>
                  <button
                    onClick={() => onSelectDelivery(delivery)}
                    style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                  >
                    Assign
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryList;
```

---

### 15. SRC/COMPONENTS/ADMINDASHBOARD/ASSIGNDRIVER.JSX

```javascript
import React, { useState } from 'react';

/**
 * AssignDriver component
 * Form to assign driver to selected delivery
 */
const AssignDriver = ({ delivery, drivers, onAssign }) => {
  const [selectedDriver, setSelectedDriver] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    if (!selectedDriver) {
      alert('Please select a driver');
      return;
    }

    setLoading(true);
    try {
      await onAssign(selectedDriver);
    } finally {
      setLoading(false);
      setSelectedDriver('');
    }
  };

  return (
    <div className="card">
      <h3>Selected Delivery</h3>
      <p>
        <strong>Customer:</strong> {delivery.customerName}
      </p>
      <p>
        <strong>Pickup:</strong> {delivery.pickupAddress}
      </p>
      <p>
        <strong>Drop:</strong> {delivery.dropAddress}
      </p>
      <p>
        <strong>Weight:</strong> {delivery.weight} kg
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAssign();
        }}
      >
        <div className="form-group">
          <label htmlFor="driver">Select Driver</label>
          <select
            id="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            required
          >
            <option value="">Choose a driver...</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.id}>
                {driver.fullName} ({driver.email})
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Assigning...' : 'Assign Driver'}
        </button>
      </form>
    </div>
  );
};

export default AssignDriver;
```

---

### 16. SRC/COMPONENTS/BUSINESSUSERDASHBOARD/BUSINESSDASHBOARD.JSX

```javascript
import React, { useState, useEffect } from 'react';
import { deliveryApi } from '../../services/api';
import CreateDelivery from './CreateDelivery';
import TrackDelivery from './TrackDelivery';

/**
 * Business User Dashboard
 * Create and track deliveries
 */
const BusinessDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load deliveries on component mount
  useEffect(() => {
    loadDeliveries();
  }, []);

  /**
   * Load user's deliveries
   */
  const loadDeliveries = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await deliveryApi.getAllDeliveries();
      setDeliveries(response.data);
    } catch (err) {
      setError('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle new delivery creation
   */
  const handleDeliveryCreated = () => {
    setShowCreateForm(false);
    loadDeliveries(); // Reload list
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1>Business User Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          style={{ backgroundColor: '#27ae60' }}
        >
          {showCreateForm ? 'Cancel' : '+ Create New Delivery'}
        </button>
      </div>

      {showCreateForm && (
        <CreateDelivery onSuccess={handleDeliveryCreated} />
      )}

      <h2>Your Deliveries</h2>
      <TrackDelivery deliveries={deliveries} />
    </div>
  );
};

export default BusinessDashboard;
```

---

### 17. SRC/COMPONENTS/BUSINESSUSERDASHBOARD/CREATEDELIVERY.JSX

```javascript
import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

/**
 * CreateDelivery component
 * Form to create new delivery order
 */
const CreateDelivery = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    pickupAddress: '',
    dropAddress: '',
    customerName: '',
    customerPhone: '',
    weight: '',
    priority: 'MEDIUM',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert weight to BigDecimal
      const data = {
        ...formData,
        weight: parseFloat(formData.weight),
      };

      await deliveryApi.createDelivery(data);

      // Reset form
      setFormData({
        pickupAddress: '',
        dropAddress: '',
        customerName: '',
        customerPhone: '',
        weight: '',
        priority: 'MEDIUM',
        notes: '',
      });

      // Call success callback
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create delivery');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Create New Delivery</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="pickupAddress">Pickup Address</label>
          <textarea
            id="pickupAddress"
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleInputChange}
            required
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="dropAddress">Drop Address</label>
          <textarea
            id="dropAddress"
            name="dropAddress"
            value={formData.dropAddress}
            onChange={handleInputChange}
            required
            rows="3"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              id="customerName"
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="customerPhone">Customer Phone</label>
            <input
              id="customerPhone"
              type="tel"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input
              id="weight"
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
              step="0.1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="2"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Delivery'}
        </button>
      </form>
    </div>
  );
};

export default CreateDelivery;
```

---

### 18. SRC/COMPONENTS/BUSINESSUSERDASHBOARD/TRACKDELIVERY.JSX

```javascript
import React from 'react';

/**
 * TrackDelivery component
 * Display delivery orders with tracking information
 */
const TrackDelivery = ({ deliveries }) => {
  const getStatusBadge = (status) => {
    const badgeClass = `badge badge-${status.toLowerCase()}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Pickup</th>
            <th>Drop</th>
            <th>Weight</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>
                No deliveries found
              </td>
            </tr>
          ) : (
            deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.pickupAddress.substring(0, 20)}...</td>
                <td>{delivery.dropAddress.substring(0, 20)}...</td>
                <td>{delivery.weight} kg</td>
                <td>{delivery.priority}</td>
                <td>{getStatusBadge(delivery.status)}</td>
                <td>₹{delivery.estimatedCost || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TrackDelivery;
```

---

### 19. SRC/COMPONENTS/DRIVERDASHBOARD/DRIVERDASHBOARD.JSX

```javascript
import React, { useState, useEffect } from 'react';
import { deliveryApi } from '../../services/api';
import AcceptDelivery from './AcceptDelivery';
import UpdateStatus from './UpdateStatus';

/**
 * Driver Dashboard
 * Shows assigned deliveries and allows status updates
 */
const DriverDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    loadDeliveries();
  }, []);

  const loadDeliveries = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await deliveryApi.getAllDeliveries();
      setDeliveries(response.data);
    } catch (err) {
      setError('Failed to load deliveries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async () => {
    loadDeliveries();
    setSelectedDelivery(null);
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="container">
      <h1>Driver Dashboard</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          <h2>Assigned Deliveries</h2>
          <AcceptDelivery
            deliveries={deliveries}
            onSelectDelivery={setSelectedDelivery}
            onRefresh={loadDeliveries}
          />
        </div>

        {selectedDelivery && (
          <div>
            <h2>Update Status</h2>
            <UpdateStatus
              delivery={selectedDelivery}
              onSuccess={handleStatusUpdate}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
```

---

### 20. SRC/COMPONENTS/DRIVERDASHBOARD/ACCEPTDELIVERY.JSX

```javascript
import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

/**
 * AcceptDelivery component
 * Shows available deliveries and allows driver to accept
 */
const AcceptDelivery = ({ deliveries, onSelectDelivery, onRefresh }) => {
  const [accepting, setAccepting] = useState(null);

  const handleAccept = async (deliveryId) => {
    setAccepting(deliveryId);

    try {
      await deliveryApi.updateDeliveryStatus(deliveryId, {
        newStatus: 'ACCEPTED',
      });

      onRefresh();
      onSelectDelivery(null);
    } catch (err) {
      alert('Failed to accept delivery');
    } finally {
      setAccepting(null);
    }
  };

  const getStatusBadge = (status) => {
    const badgeClass = `badge badge-${status.toLowerCase()}`;
    return <span className={badgeClass}>{status}</span>;
  };

  return (
    <div className="card">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>From</th>
            <th>To</th>
            <th>Weight</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>
                No deliveries assigned
              </td>
            </tr>
          ) : (
            deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>#{delivery.id}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.pickupAddress.substring(0, 15)}...</td>
                <td>{delivery.dropAddress.substring(0, 15)}...</td>
                <td>{delivery.weight} kg</td>
                <td>{getStatusBadge(delivery.status)}</td>
                <td>
                  {delivery.status === 'PENDING' ? (
                    <button
                      onClick={() => handleAccept(delivery.id)}
                      disabled={accepting === delivery.id}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.875rem',
                        backgroundColor: '#27ae60',
                      }}
                    >
                      {accepting === delivery.id ? 'Accepting...' : 'Accept'}
                    </button>
                  ) : (
                    <button
                      onClick={() => onSelectDelivery(delivery)}
                      style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.875rem',
                      }}
                    >
                      Update
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AcceptDelivery;
```

---

### 21. SRC/COMPONENTS/DRIVERDASHBOARD/UPDATESTATUS.JSX

```javascript
import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

/**
 * UpdateStatus component
 * Form to update delivery status
 */
const UpdateStatus = ({ delivery, onSuccess }) => {
  const [newStatus, setNewStatus] = useState(delivery.status);
  const [actualKm, setActualKm] = useState(delivery.actualKm || '');
  const [actualCost, setActualCost] = useState(delivery.actualCost || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = {
        newStatus,
        actualKm: actualKm ? parseFloat(actualKm) : null,
        actualCost: actualCost ? parseFloat(actualCost) : null,
      };

      await deliveryApi.updateDeliveryStatus(delivery.id, data);
      onSuccess();
    } catch (err) {
      setError('Failed to update status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3>{delivery.customerName}</h3>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="status">Update Status</label>
          <select
            id="status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            required
          >
            <option value="PENDING">Pending</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="ON_WAY">On Way</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {newStatus === 'DELIVERED' && (
          <>
            <div className="form-group">
              <label htmlFor="actualKm">Actual KM</label>
              <input
                id="actualKm"
                type="number"
                value={actualKm}
                onChange={(e) => setActualKm(e.target.value)}
                step="0.1"
              />
            </div>

            <div className="form-group">
              <label htmlFor="actualCost">Actual Cost (₹)</label>
              <input
                id="actualCost"
                type="number"
                value={actualCost}
                onChange={(e) => setActualCost(e.target.value)}
                step="0.1"
              />
            </div>
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </form>
    </div>
  );
};

export default UpdateStatus;
```

---

### 22. SRC/APP.JSX - Main Application Component

```javascript
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

/**
 * Main App component
 * Sets up routing and layout
 */
function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to dashboard if authenticated, else login */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## FRONTEND SETUP & INSTALLATION

### Prerequisites
- Node.js 14+ and npm installed
- Backend running on http://localhost:8080

### Installation Steps

```bash
# 1. Create React app
npx create-react-app logistics-delivery-frontend
cd logistics-delivery-frontend

# 2. Install dependencies
npm install react-router-dom axios

# 3. Copy all component files to src/components/
# Copy all page files to src/pages/
# Copy context and services to respective folders

# 4. Update public/index.html
# Copy the provided HTML code

# 5. Update src/index.css
# Copy the provided CSS code

# 6. Create .env file
echo "REACT_APP_API_URL=http://localhost:8080/api" > .env

# 7. Start development server
npm start

# Application runs on http://localhost:3000
```

---

## DEPLOYMENT GUIDE

### Deploy Backend (Spring Boot) to Heroku

```bash
# 1. Create Procfile in project root
echo "web: java -Dserver.port=\$PORT \$JAVA_OPTS -jar target/*.jar" > Procfile

# 2. Build JAR file
mvn clean package -DskipTests

# 3. Login to Heroku
heroku login

# 4. Create Heroku app
heroku create your-app-name

# 5. Add MySQL database
heroku addons:create cleardb:ignite

# 6. Deploy
git push heroku main
```

### Deploy Frontend (React) to Vercel

```bash
# 1. Build React app
npm run build

# 2. Install Vercel CLI
npm install -g vercel

# 3. Login to Vercel
vercel login

# 4. Deploy
vercel --prod

# 5. Update REACT_APP_API_URL to backend URL
```

---

## RUNNING DEMO

### Create Demo Data

**Register Demo Users:**

1. Admin:
   - Email: admin@test.com
   - Password: admin123
   - Role: ADMIN

2. Business User:
   - Email: business@test.com
   - Password: business123
   - Role: BUSINESS_USER

3. Driver:
   - Email: driver@test.com
   - Password: driver123
   - Role: DRIVER

### Demo Workflow

1. **Admin** logs in → Views all deliveries → Assigns drivers
2. **Business User** logs in → Creates delivery → Tracks order
3. **Driver** logs in → Accepts delivery → Updates status → Marks delivered

---

## KEY CONCEPTS EXPLAINED

### Frontend Concepts:

1. **React**: UI library for building interactive interfaces
2. **JSX**: JavaScript XML syntax for writing HTML-like code
3. **React Hooks**: useState, useEffect, useContext for state management
4. **React Router**: Client-side routing between pages
5. **Context API**: Global state management for authentication
6. **Axios**: HTTP client for API communication
7. **Interceptors**: Automatically add auth token to requests
8. **Responsive Design**: CSS media queries for mobile compatibility
9. **Form Handling**: Controlled components for form inputs
10. **Error Handling**: Try-catch blocks and error states

### This concludes the complete React frontend code!
