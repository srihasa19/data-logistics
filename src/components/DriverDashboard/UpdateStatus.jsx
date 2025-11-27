import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

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
