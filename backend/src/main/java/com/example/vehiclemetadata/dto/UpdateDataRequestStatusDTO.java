package com.example.vehiclemetadata.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record UpdateDataRequestStatusDTO(
    @NotNull(message = "Status is required")
    @Pattern(regexp = "PENDING|APPROVED|REJECTED", message = "Status must be PENDING, APPROVED, or REJECTED")
    String status
) {}