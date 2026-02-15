package com.example.vehiclemetadata.controller;

import com.example.vehiclemetadata.dto.SignalDTO;
import com.example.vehiclemetadata.entity.Signal;
import com.example.vehiclemetadata.repository.SignalRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/signals")
@CrossOrigin(origins = "*")
public class SignalController {
    
    private final SignalRepository signalRepository;
    
    public SignalController(SignalRepository signalRepository) {
        this.signalRepository = signalRepository;
    }
    
    @GetMapping
    public ResponseEntity<List<SignalDTO>> getAllSignals() {
        List<SignalDTO> signals = signalRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(signals);
    }
    
    private SignalDTO toDTO(Signal signal) {
        return new SignalDTO(
                signal.getId(),
                signal.getName(),
                signal.getCategory(),
                signal.getDescription()
        );
    }
}