import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

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
      const data = {
        ...formData,
        weight: parseFloat(formData.weight),
      };

      await deliveryApi.createDelivery(data);

      setFormData({
        pickupAddress: '',
        dropAddress: '',
        customerName: '',
        customerPhone: '',
        weight: '',
        priority: 'MEDIUM',
        notes: '',
      });

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
