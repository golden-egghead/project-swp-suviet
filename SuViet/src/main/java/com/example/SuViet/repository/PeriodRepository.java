package com.example.SuViet.repository;

import com.example.SuViet.model.Period;
import com.example.SuViet.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PeriodRepository extends JpaRepository<Period, Integer> {
    List<Period> findAllByEnabled(boolean enabled);

    Period findByPeriodName(@Param("periodName") String periodName);

    List<Period> findAllByPeriodNameContaining(@Param("periodName") String periodName);
}
