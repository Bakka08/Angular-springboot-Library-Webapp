package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.DamageReport;

public interface DamageReportRepository extends JpaRepository<DamageReport, Integer> {
    // Additional query methods if needed
}