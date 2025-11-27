package com.logistics.backend.dto;

import com.logistics.backend.entity.DeliveryPriority;
import com.logistics.backend.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryDto {

    private Long id;

    @NotBlank(message = "Pickup address is required")
    private String pickupAddress;

    @NotBlank(message = "Drop address is required")
    private String dropAddress;

    @NotBlank(message = "Customer name is required")
    private String customerName;

    @NotBlank(message = "Customer phone is required")
    private String customerPhone;

    @NotNull(message = "Weight is required")
    private BigDecimal weight;

    private DeliveryPriority priority = DeliveryPriority.MEDIUM;

    private String notes;

    private DeliveryStatus status;

    private BigDecimal estimatedKm;

    private BigDecimal estimatedCost;

    private BigDecimal actualKm;

    private BigDecimal actualCost;

    private UserDto businessUser;

    private UserDto driver;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
