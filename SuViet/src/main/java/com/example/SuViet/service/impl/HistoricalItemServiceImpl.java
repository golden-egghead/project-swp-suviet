package com.example.SuViet.service.impl;

import com.example.SuViet.dto.HistoricalItemDTO;
import com.example.SuViet.model.HistoricalItem;
import com.example.SuViet.repository.HistoricalItemRepository;
import com.example.SuViet.service.HistoricalItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HistoricalItemServiceImpl implements HistoricalItemService {
    @Autowired
    private HistoricalItemRepository repo;

    @Override
    public HistoricalItem saveHistoricalItem(HistoricalItem historicalItem) {
        return repo.save(historicalItem);
    }

    @Override
    public Optional<HistoricalItem> findById(int id) {
        return repo.findById(id);
    }

    @Override
    public List<HistoricalItem> getAllHistoricalItems() {
        return repo.findAllByEnabled(true);
    }

    @Override
    public Page<HistoricalItemDTO> getHistoricalItemsWithPagination(int offset, int pageSize) {
        Page<HistoricalItem> historicalItems = repo.findAllByEnabled(true, PageRequest.of(offset-1, pageSize));
        return historicalItems.map(historicalItem -> HistoricalItemDTO.convertToDTO(historicalItem));
    }

    @Override
    public List<HistoricalItem> getAllHistoricalItemsByName(String historicalItemsName) {
        return repo.findAllByEnabledAndNameContaining(true, historicalItemsName);
    }

    @Override
    public Page<HistoricalItemDTO> getAllHistoricalItemsByName(String historicalItemsName, int offset, int pageSize) {
        Page<HistoricalItem> historicalItems = repo.findAllByEnabledAndNameContaining(true, historicalItemsName, PageRequest.of(offset-1, pageSize));
        return historicalItems.map(historicalItem -> HistoricalItemDTO.convertToDTO(historicalItem));
    }

    @Override
    public Page<HistoricalItemDTO> getHistoricalItemWithSortAndPaging(int offset, int pageSize, String field) {
        Page<HistoricalItem> historicalItems = repo.findAllByEnabled(true,PageRequest.of(offset - 1, pageSize).withSort(Sort.by(field)));
       return historicalItems.map(historicalItem -> HistoricalItemDTO.convertToDTO(historicalItem));
    }

    @Override
    public boolean deleteAHistoricalItem(int id) {
        HistoricalItem itemToDelete = repo.findById(id).get();
        try {
            if (itemToDelete.isEnabled()) {
                itemToDelete.setEnabled(false);
            } else  {
                itemToDelete.setEnabled(true);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
