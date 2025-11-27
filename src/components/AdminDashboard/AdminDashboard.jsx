import React, { useState, useEffect } from 'react';
import { deliveryApi, userApi } from '../../services/api';
import DeliveryList from './DeliveryList';
import AssignDriver from './AssignDriver';

const AdminDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

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

  const handleAssignDriver = async (driverId) => {
    try {
      await deliveryApi.assignDriver(selectedDelivery.id, driverId);
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
