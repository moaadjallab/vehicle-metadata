package com.example.vehiclemetadata.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public record DataRequestDTO(
    UUID id,
    UUID signalId,
    String signalName,
    UUID legalPurposeId,
    String legalPurposeTitle,
    String status,
    LocalDateTime createdAt,
    LocalDateTime updatedAt
) {}