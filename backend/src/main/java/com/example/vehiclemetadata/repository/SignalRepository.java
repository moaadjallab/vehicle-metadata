package com.example.vehiclemetadata.repository;

import com.example.vehiclemetadata.entity.Signal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SignalRepository extends JpaRepository<Signal, UUID> {
}