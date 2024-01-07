package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.Loan;

public interface LoanRepository extends JpaRepository<Loan, Integer> {
    Loan findById(int id);
}
