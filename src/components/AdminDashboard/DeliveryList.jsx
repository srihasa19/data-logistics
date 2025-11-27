import React from 'react';

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
