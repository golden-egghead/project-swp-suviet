package com.example.SuViet.repository;

import com.example.SuViet.model.HistoricalItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistoricalItemRepository extends JpaRepository<HistoricalItem, Integer> {
    public List<HistoricalItem> findAllByEnabled(boolean enabled);
    public Page<HistoricalItem> findAllByEnabled(boolean enabled, PageRequest pageRequest);
    public List<HistoricalItem> findAllByEnabledAndNameContaining(boolean enabled, @Param("historicalItemName") String historicalItemName);
    public Page<HistoricalItem> findAllByEnabledAndNameContaining(boolean enabled, @Param("historicalItemName") String historicalItemName, PageRequest pageRequest);


}
