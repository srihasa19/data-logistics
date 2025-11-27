import React, { useState } from 'react';

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
