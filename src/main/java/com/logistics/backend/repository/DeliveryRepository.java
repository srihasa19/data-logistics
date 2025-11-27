package com.logistics.backend.repository;

import com.logistics.backend.entity.Delivery;
import com.logistics.backend.entity.DeliveryStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByBusinessUserId(Long businessUserId);
    List<Delivery> findByDriverId(Long driverId);
    List<Delivery> findByStatus(DeliveryStatus status);
    List<Delivery> findByStatusAndDriverIsNull(DeliveryStatus status);
}
