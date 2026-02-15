package com.example.vehiclemetadata.dto;

import java.util.UUID;

public record SignalDTO(
    UUID id,
    String name,
    String category,
    String description
) {}