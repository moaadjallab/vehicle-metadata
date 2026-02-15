package com.example.vehiclemetadata.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.util.UUID;

@Entity
@Table(name = "legal_purpose")
public class LegalPurpose {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @NotBlank
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @NotBlank
    @Column(nullable = false)
    private String regulation;
    
    // Constructeurs
    public LegalPurpose() {}
    
    public LegalPurpose(String title, String description, String regulation) {
        this.title = title;
        this.description = description;
        this.regulation = regulation;
    }
    
    // Getters et Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getRegulation() {
        return regulation;
    }
    
    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }
}