package com.example.SuViet.service;

import com.example.SuViet.dto.HistoricalItemDTO;
import com.example.SuViet.model.HistoricalItem;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HistoricalItemService {
    HistoricalItem saveHistoricalItem(HistoricalItem historicalItem);
    Optional<HistoricalItem> findById(int id);
    List<HistoricalItem> getAllHistoricalItems();
    Page<HistoricalItemDTO> getHistoricalItemsWithPagination(int offset, int pageSize);
    List<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName);
    Page<HistoricalItemDTO> getAllHistoricalItemsByName(String historicalItemsName, int offset, int pageSize);
    Page<HistoricalItemDTO> getHistoricalItemWithSortAndPaging(int offset, int pageSize, String field);

    boolean deleteAHistoricalItem(int id);
}
