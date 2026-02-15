package com.example.vehiclemetadata.service;

import com.example.vehiclemetadata.dto.CreateDataRequestDTO;
import com.example.vehiclemetadata.dto.DataRequestDTO;
import com.example.vehiclemetadata.dto.UpdateDataRequestStatusDTO;
import com.example.vehiclemetadata.entity.DataRequest;
import com.example.vehiclemetadata.entity.LegalPurpose;
import com.example.vehiclemetadata.entity.Signal;
import com.example.vehiclemetadata.repository.DataRequestRepository;
import com.example.vehiclemetadata.repository.LegalPurposeRepository;
import com.example.vehiclemetadata.repository.SignalRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class DataRequestService {
    
    private final DataRequestRepository dataRequestRepository;
    private final SignalRepository signalRepository;
    private final LegalPurposeRepository legalPurposeRepository;
    
    public DataRequestService(
            DataRequestRepository dataRequestRepository,
            SignalRepository signalRepository,
            LegalPurposeRepository legalPurposeRepository) {
        this.dataRequestRepository = dataRequestRepository;
        this.signalRepository = signalRepository;
        this.legalPurposeRepository = legalPurposeRepository;
    }
    
    public List<DataRequestDTO> getAllDataRequests() {
        return dataRequestRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public DataRequestDTO getDataRequestById(UUID id) {
        DataRequest dataRequest = dataRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data request not found with id: " + id));
        return toDTO(dataRequest);
    }
    
    @Transactional
    public DataRequestDTO createDataRequest(CreateDataRequestDTO dto) {
        Signal signal = signalRepository.findById(dto.signalId())
                .orElseThrow(() -> new RuntimeException("Signal not found with id: " + dto.signalId()));
        
        LegalPurpose legalPurpose = legalPurposeRepository.findById(dto.legalPurposeId())
                .orElseThrow(() -> new RuntimeException("Legal purpose not found with id: " + dto.legalPurposeId()));
        
        DataRequest dataRequest = new DataRequest(signal, legalPurpose, DataRequest.RequestStatus.PENDING);
        DataRequest saved = dataRequestRepository.save(dataRequest);
        
        return toDTO(saved);
    }
    
    @Transactional
    public DataRequestDTO updateDataRequestStatus(UUID id, UpdateDataRequestStatusDTO dto) {
        DataRequest dataRequest = dataRequestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Data request not found with id: " + id));
        
        dataRequest.setStatus(DataRequest.RequestStatus.valueOf(dto.status()));
        DataRequest updated = dataRequestRepository.save(dataRequest);
        
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteDataRequest(UUID id) {
        if (!dataRequestRepository.existsById(id)) {
            throw new RuntimeException("Data request not found with id: " + id);
        }
        dataRequestRepository.deleteById(id);
    }
    
    private DataRequestDTO toDTO(DataRequest dataRequest) {
        return new DataRequestDTO(
                dataRequest.getId(),
                dataRequest.getSignal().getId(),
                dataRequest.getSignal().getName(),
                dataRequest.getLegalPurpose().getId(),
                dataRequest.getLegalPurpose().getTitle(),
                dataRequest.getStatus().name(),
                dataRequest.getCreatedAt(),
                dataRequest.getUpdatedAt()
        );
    }
}