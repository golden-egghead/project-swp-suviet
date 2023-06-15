package com.example.SuViet.service;

import com.example.SuViet.model.Book;
import com.example.SuViet.model.HistoricalItem;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HistoricalItemService {

    List<HistoricalItem> getAllHistoricalItems();
    Page<HistoricalItem> getHistoricalItemsWithPagination(int offset, int pageSize);
    List<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName);
    Page<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName, int offset, int pageSize);

    Page<HistoricalItem> getHistoricalItemWithSortAndPaging(int offset, int pageSize, String field);
}
