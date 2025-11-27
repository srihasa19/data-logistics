import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import BusinessDashboard from '../components/BusinessUserDashboard/BusinessDashboard';
import DriverDashboard from '../components/DriverDashboard/DriverDashboard';

const Dashboard = () => {
  const { user } = useAuth();

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
