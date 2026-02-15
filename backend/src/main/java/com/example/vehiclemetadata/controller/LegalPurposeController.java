package com.example.vehiclemetadata.controller;

import com.example.vehiclemetadata.dto.LegalPurposeDTO;
import com.example.vehiclemetadata.entity.LegalPurpose;
import com.example.vehiclemetadata.repository.LegalPurposeRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/legal-purposes")
@CrossOrigin(origins = "*")
public class LegalPurposeController {
    
    private final LegalPurposeRepository legalPurposeRepository;
    
    public LegalPurposeController(LegalPurposeRepository legalPurposeRepository) {
        this.legalPurposeRepository = legalPurposeRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<LegalPurposeDTO>> getAllLegalPurposes() {
        List<LegalPurposeDTO> purposes = legalPurposeRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(purposes);
    }
    
    private LegalPurposeDTO toDTO(LegalPurpose purpose) {
        return new LegalPurposeDTO(
                purpose.getId(),
                purpose.getTitle(),
                purpose.getDescription(),
                purpose.getRegulation()
        );
    }
}