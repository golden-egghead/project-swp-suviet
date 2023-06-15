package com.example.SuViet.service.impl;

import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.repository.HistoricalItemRepository;
import com.example.SuViet.service.HistoricalItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class HistoricalItemServiceImpl implements HistoricalItemService {
    @Autowired
    private HistoricalItemRepository repo;

    @Override
    public List<HistoricalItem> getAllHistoricalItems() {
        return repo.findAllByEnabled(true);
    }

    @Override
    public Page<HistoricalItem> getHistoricalItemsWithPagination(int offset, int pageSize) {
        return repo.findAllByEnabled(true, PageRequest.of(offset-1, pageSize));
    }

    @Override
    public List<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName) {
        return repo.findAllByEnabledAndNameContaining(true, historicalItemsName);
    }

    @Override
    public Page<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName, int offset, int pageSize) {
        return repo.findAllByEnabledAndNameContaining(true, historicalItemsName, PageRequest.of(offset-1, pageSize));
    }

    @Override
    public Page<HistoricalItem> getHistoricalItemWithSortAndPaging(int offset, int pageSize, String field) {
        Page<HistoricalItem> historicalItemPage = repo.findAllByEnabled(true,PageRequest.of(offset - 1, pageSize).withSort(Sort.by(field)));
        return historicalItemPage;
    }

}
