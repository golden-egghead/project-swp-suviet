package com.example.SuViet.repository;

import com.example.SuViet.model.HistoricalSite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoricalSiteRepository extends JpaRepository<HistoricalSite, Integer> {
    List<HistoricalSite> findAllByEnabled(boolean enabled);
    Page<HistoricalSite> findAllByEnabled(boolean enabled, PageRequest pageRequest);
    List<HistoricalSite> findAllByEnabledAndHistoricalSiteNameContaining(boolean enabled, @Param("historicalSiteName") String historicalSiteName);
    Page<HistoricalSite> findAllByEnabledAndHistoricalSiteNameContaining(boolean enabled, @Param("historicalSiteName") String historicalSiteName, PageRequest pageRequest);
}
