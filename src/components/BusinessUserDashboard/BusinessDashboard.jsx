import React, { useState, useEffect } from 'react';
import { deliveryApi } from '../../services/api';
import CreateDelivery from './CreateDelivery';
import TrackDelivery from './TrackDelivery';

const BusinessDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

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

  const handleDeliveryCreated = () => {
    setShowCreateForm(false);
    loadDeliveries();
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
