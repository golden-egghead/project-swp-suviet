package com.example.SuViet.repository;

import com.example.SuViet.model.Period;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeriodRepository extends JpaRepository<Period, Integer> {
    List<Period> findAllByEnabled(boolean enabled);
}
