package com.logistics.backend.controller;

import com.logistics.backend.dto.DeliveryDto;
import com.logistics.backend.dto.StatusUpdateRequest;
import com.logistics.backend.entity.UserRole;
import com.logistics.backend.service.DeliveryService;
import com.logistics.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/deliveries")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class DeliveryController {

    @Autowired
    private DeliveryService deliveryService;

    @Autowired
    private UserService userService;

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userService.getUserByEmail(email).getId();
    }

    @PostMapping
    public ResponseEntity<DeliveryDto> createDelivery(@Valid @RequestBody DeliveryDto deliveryDto) {
        Long userId = getCurrentUserId();
        DeliveryDto createdDelivery = deliveryService.createDelivery(deliveryDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdDelivery);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryDto> getDelivery(@PathVariable Long id) {
        DeliveryDto delivery = deliveryService.getDeliveryById(id);
        return ResponseEntity.ok(delivery);
    }

    @GetMapping
    public ResponseEntity<List<DeliveryDto>> getAllDeliveries() {
        Long userId = getCurrentUserId();
        var user = userService.getUserById(userId);

        List<DeliveryDto> deliveries;

        if (user.getRole() == UserRole.ADMIN) {
            deliveries = deliveryService.getPendingDeliveries();
        } else if (user.getRole() == UserRole.BUSINESS_USER) {
            deliveries = deliveryService.getDeliveriesByBusinessUser(userId);
        } else if (user.getRole() == UserRole.DRIVER) {
            deliveries = deliveryService.getDeliveriesByDriver(userId);
        } else {
            deliveries = List.of();
        }

        return ResponseEntity.ok(deliveries);
    }

    @PutMapping("/{id}/assign-driver/{driverId}")
    public ResponseEntity<DeliveryDto> assignDriver(
            @PathVariable Long id,
            @PathVariable Long driverId) {
        Long userId = getCurrentUserId();
        var user = userService.getUserById(userId);

        if (user.getRole() != UserRole.ADMIN) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        DeliveryDto updatedDelivery = deliveryService.assignDriver(id, driverId);
        return ResponseEntity.ok(updatedDelivery);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<DeliveryDto> updateDeliveryStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {
        Long userId = getCurrentUserId();
        DeliveryDto updatedDelivery = deliveryService.updateDeliveryStatus(id, request, userId);
        return ResponseEntity.ok(updatedDelivery);
    }
}
