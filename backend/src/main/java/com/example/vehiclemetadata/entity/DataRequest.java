package com.example.vehiclemetadata.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "data_request")
public class DataRequest {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "signal_id", nullable = false)
    private Signal signal;
    
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "legal_purpose_id", nullable = false)
    private LegalPurpose legalPurpose;
    
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private RequestStatus status;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
    
    // Enum pour le statut
    public enum RequestStatus {
        PENDING,
        APPROVED,
        REJECTED
    }
    
    // Constructeurs
    public DataRequest() {}
    
    public DataRequest(Signal signal, LegalPurpose legalPurpose, RequestStatus status) {
        this.signal = signal;
        this.legalPurpose = legalPurpose;
        this.status = status;
    }
    
    // Lifecycle callbacks for timestamps
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters et Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public Signal getSignal() {
        return signal;
    }
    
    public void setSignal(Signal signal) {
        this.signal = signal;
    }
    
    public LegalPurpose getLegalPurpose() {
        return legalPurpose;
    }
    
    public void setLegalPurpose(LegalPurpose legalPurpose) {
        this.legalPurpose = legalPurpose;
    }
    
    public RequestStatus getStatus() {
        return status;
    }
    
    public void setStatus(RequestStatus status) {
        this.status = status;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}