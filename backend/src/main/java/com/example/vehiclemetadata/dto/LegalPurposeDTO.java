package com.example.vehiclemetadata.dto;

import java.util.UUID;

public record LegalPurposeDTO(
    UUID id,
    String title,
    String description,
    String regulation
) {}