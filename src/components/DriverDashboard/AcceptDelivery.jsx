import React, { useState } from 'react';
import { deliveryApi } from '../../services/api';

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
