package com.logistics.backend.service;

import com.logistics.backend.dto.DeliveryDto;
import com.logistics.backend.dto.StatusUpdateRequest;
import com.logistics.backend.dto.UserDto;
import com.logistics.backend.entity.*;
import com.logistics.backend.exception.ResourceNotFoundException;
import com.logistics.backend.repository.DeliveryRepository;
import com.logistics.backend.repository.StatusHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DeliveryService {

    @Autowired
    private DeliveryRepository deliveryRepository;

    @Autowired
    private StatusHistoryRepository statusHistoryRepository;

    @Autowired
    private UserService userService;

    public DeliveryDto createDelivery(DeliveryDto deliveryDto, Long businessUserId) {
        Delivery delivery = new Delivery();

        User businessUser = userService.getUserEntityById(businessUserId);
        delivery.setBusinessUser(businessUser);

        delivery.setPickupAddress(deliveryDto.getPickupAddress());
        delivery.setDropAddress(deliveryDto.getDropAddress());
        delivery.setCustomerName(deliveryDto.getCustomerName());
        delivery.setCustomerPhone(deliveryDto.getCustomerPhone());
        delivery.setWeight(deliveryDto.getWeight());
        delivery.setPriority(deliveryDto.getPriority());
        delivery.setNotes(deliveryDto.getNotes());

        delivery.setEstimatedCost(calculateCost(deliveryDto.getWeight(), deliveryDto.getPriority()));

        Delivery savedDelivery = deliveryRepository.save(delivery);
        return convertToDto(savedDelivery);
    }

    public DeliveryDto getDeliveryById(Long id) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + id));
        return convertToDto(delivery);
    }

    public List<DeliveryDto> getDeliveriesByBusinessUser(Long businessUserId) {
        List<Delivery> deliveries = deliveryRepository.findByBusinessUserId(businessUserId);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<DeliveryDto> getDeliveriesByDriver(Long driverId) {
        List<Delivery> deliveries = deliveryRepository.findByDriverId(driverId);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public DeliveryDto assignDriver(Long deliveryId, Long driverId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        User driver = userService.getUserEntityById(driverId);
        if (driver.getRole() != UserRole.DRIVER) {
            throw new IllegalArgumentException("User is not a driver");
        }

        delivery.setDriver(driver);
        Delivery updatedDelivery = deliveryRepository.save(delivery);

        return convertToDto(updatedDelivery);
    }

    public DeliveryDto updateDeliveryStatus(
            Long deliveryId,
            StatusUpdateRequest request,
            Long userId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found"));

        DeliveryStatus oldStatus = delivery.getStatus();
        delivery.setStatus(request.getNewStatus());

        if (request.getNewStatus() == DeliveryStatus.DELIVERED) {
            if (request.getActualKm() != null) {
                delivery.setActualKm(request.getActualKm());
            }
            if (request.getActualCost() != null) {
                delivery.setActualCost(request.getActualCost());
            }
        }

        Delivery updatedDelivery = deliveryRepository.save(delivery);

        User changedBy = userService.getUserEntityById(userId);
        StatusHistory history = new StatusHistory();
        history.setDelivery(delivery);
        history.setOldStatus(oldStatus.toString());
        history.setNewStatus(request.getNewStatus().toString());
        history.setChangedBy(changedBy);
        statusHistoryRepository.save(history);

        return convertToDto(updatedDelivery);
    }

    public List<DeliveryDto> getPendingDeliveries() {
        List<Delivery> deliveries = deliveryRepository.findByStatusAndDriverIsNull(DeliveryStatus.PENDING);
        return deliveries.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private BigDecimal calculateCost(BigDecimal weight, DeliveryPriority priority) {
        BigDecimal baseCost = new BigDecimal("50");
        BigDecimal weightCost = weight.multiply(new BigDecimal("10"));
        BigDecimal totalCost = baseCost.add(weightCost);

        if (priority == DeliveryPriority.HIGH) {
            totalCost = totalCost.multiply(new BigDecimal("1.5"));
        } else if (priority == DeliveryPriority.MEDIUM) {
            totalCost = totalCost.multiply(new BigDecimal("1.2"));
        }

        return totalCost;
    }

    private DeliveryDto convertToDto(Delivery delivery) {
        DeliveryDto dto = new DeliveryDto();
        dto.setId(delivery.getId());
        dto.setPickupAddress(delivery.getPickupAddress());
        dto.setDropAddress(delivery.getDropAddress());
        dto.setCustomerName(delivery.getCustomerName());
        dto.setCustomerPhone(delivery.getCustomerPhone());
        dto.setWeight(delivery.getWeight());
        dto.setPriority(delivery.getPriority());
        dto.setNotes(delivery.getNotes());
        dto.setStatus(delivery.getStatus());
        dto.setEstimatedKm(delivery.getEstimatedKm());
        dto.setEstimatedCost(delivery.getEstimatedCost());
        dto.setActualKm(delivery.getActualKm());
        dto.setActualCost(delivery.getActualCost());
        dto.setCreatedAt(delivery.getCreatedAt());
        dto.setUpdatedAt(delivery.getUpdatedAt());

        if (delivery.getBusinessUser() != null) {
            UserDto businessUserDto = new UserDto();
            businessUserDto.setId(delivery.getBusinessUser().getId());
            businessUserDto.setEmail(delivery.getBusinessUser().getEmail());
            businessUserDto.setFullName(delivery.getBusinessUser().getFullName());
            dto.setBusinessUser(businessUserDto);
        }

        if (delivery.getDriver() != null) {
            UserDto driverDto = new UserDto();
            driverDto.setId(delivery.getDriver().getId());
            driverDto.setEmail(delivery.getDriver().getEmail());
            driverDto.setFullName(delivery.getDriver().getFullName());
            dto.setDriver(driverDto);
        }

        return dto;
    }
}
