package com.logistics.backend.dto;

import com.logistics.backend.entity.DeliveryStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusUpdateRequest {

    @NotNull(message = "New status is required")
    private DeliveryStatus newStatus;

    private BigDecimal actualKm;

    private BigDecimal actualCost;
}
