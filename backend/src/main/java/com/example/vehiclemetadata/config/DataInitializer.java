package com.example.vehiclemetadata.config;

import com.example.vehiclemetadata.entity.LegalPurpose;
import com.example.vehiclemetadata.entity.Signal;
import com.example.vehiclemetadata.repository.LegalPurposeRepository;
import com.example.vehiclemetadata.repository.SignalRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {
    
    private final SignalRepository signalRepository;
    private final LegalPurposeRepository legalPurposeRepository;
    
    public DataInitializer(SignalRepository signalRepository, 
                          LegalPurposeRepository legalPurposeRepository) {
        this.signalRepository = signalRepository;
        this.legalPurposeRepository = legalPurposeRepository;
    }
    
    @Override
    public void run(String... args) {
        // Create sample signals
        if (signalRepository.count() == 0) {
            signalRepository.save(new Signal("Engine Temperature", "Temperature", "Current engine temperature in Celsius"));
            signalRepository.save(new Signal("Vehicle Speed", "Speed", "Current vehicle speed in km/h"));
            signalRepository.save(new Signal("Fuel Level", "Fuel", "Remaining fuel percentage"));
            signalRepository.save(new Signal("Battery Voltage", "Electrical", "Main battery voltage"));
            signalRepository.save(new Signal("GPS Location", "Location", "Current GPS coordinates"));
        }
        
        // Create sample legal purposes
        if (legalPurposeRepository.count() == 0) {
            legalPurposeRepository.save(new LegalPurpose(
                "Vehicle Diagnostics",
                "Monitor vehicle health and performance metrics",
                "EU Data Act"
            ));
            legalPurposeRepository.save(new LegalPurpose(
                "Safety Analysis",
                "Analyze driving patterns for safety improvements",
                "GDPR"
            ));
            legalPurposeRepository.save(new LegalPurpose(
                "Fleet Management",
                "Track and optimize fleet operations",
                "EU Data Act"
            ));
            legalPurposeRepository.save(new LegalPurpose(
                "Research & Development",
                "Improve vehicle systems based on real-world data",
                "EU Data Act"
            ));
        }
    }
}