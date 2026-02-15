package com.example.vehiclemetadata.dto;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public record CreateDataRequestDTO(
    @NotNull(message = "Signal ID is required")
    UUID signalId,
    
    @NotNull(message = "Legal Purpose ID is required")
    UUID legalPurposeId
) {}