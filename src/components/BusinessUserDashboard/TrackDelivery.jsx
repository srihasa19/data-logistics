import React from 'react';

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
