import React, { useState, useEffect } from 'react';
import { deliveryApi } from '../../services/api';
import AcceptDelivery from './AcceptDelivery';
import UpdateStatus from './UpdateStatus';

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
