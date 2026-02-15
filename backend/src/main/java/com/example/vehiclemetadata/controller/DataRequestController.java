package com.example.vehiclemetadata.controller;

import com.example.vehiclemetadata.dto.CreateDataRequestDTO;
import com.example.vehiclemetadata.dto.DataRequestDTO;
import com.example.vehiclemetadata.dto.UpdateDataRequestStatusDTO;
import com.example.vehiclemetadata.service.DataRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/data-requests")
@CrossOrigin(origins = "*")
public class DataRequestController {
    
    private final DataRequestService dataRequestService;
    
    public DataRequestController(DataRequestService dataRequestService) {
        this.dataRequestService = dataRequestService;
    }
    
    @GetMapping
    public ResponseEntity<List<DataRequestDTO>> getAllDataRequests() {
        List<DataRequestDTO> requests = dataRequestService.getAllDataRequests();
        return ResponseEntity.ok(requests);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<DataRequestDTO> getDataRequestById(@PathVariable UUID id) {
        DataRequestDTO request = dataRequestService.getDataRequestById(id);
        return ResponseEntity.ok(request);
    }
    
    @PostMapping
    public ResponseEntity<DataRequestDTO> createDataRequest(@Valid @RequestBody CreateDataRequestDTO dto) {
        DataRequestDTO created = dataRequestService.createDataRequest(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PatchMapping("/{id}/status")
    public ResponseEntity<DataRequestDTO> updateDataRequestStatus(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateDataRequestStatusDTO dto) {
        DataRequestDTO updated = dataRequestService.updateDataRequestStatus(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDataRequest(@PathVariable UUID id) {
        dataRequestService.deleteDataRequest(id);
        return ResponseEntity.noContent().build();
    }
}