package com.example.SuViet.repository;

import com.example.SuViet.model.HistoricalSite;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoricalSiteRepository extends JpaRepository<HistoricalSite, Integer> {
    public List<HistoricalSite> findAllByEnabled(boolean enabled);
    public Page<HistoricalSite> findAllByEnabled(boolean enabled, PageRequest pageRequest);
    public List<HistoricalSite> findAllByEnabledAndHistoricalSiteNameContaining(boolean enabled, @Param("historicalSiteName") String historicalSiteName);
    public Page<HistoricalSite> findAllByEnabledAndHistoricalSiteNameContaining(boolean enabled, @Param("historicalSiteName") String historicalSiteName, PageRequest pageRequest);
}
