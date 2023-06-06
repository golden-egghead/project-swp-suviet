package com.example.SuViet.service.impl;

import com.example.SuViet.model.HistoricalSite;
import com.example.SuViet.repository.HistoricalSiteRepository;
import com.example.SuViet.service.HistoricalSiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoricalSiteServiceImpl implements HistoricalSiteService {
    private final HistoricalSiteRepository historicalSiteRepository;

    @Autowired
    public HistoricalSiteServiceImpl(HistoricalSiteRepository historicalSiteRepository) {
        this.historicalSiteRepository = historicalSiteRepository;
    }

    @Override
    public List<HistoricalSite> getAllHistoricalSites() {
        return historicalSiteRepository.findAllByEnabled(true);
    }

    @Override
    public Page<HistoricalSite> getHistoricalSitesWithPagination(int offset, int pagesize) {
        return historicalSiteRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pagesize));
    }

    @Override
    public List<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName) {
        return historicalSiteRepository.findAllByEnabledAndHistoricalSiteNameContaining(true, historicalSiteName);
    }

    @Override
    public Page<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName, int offset, int pagesize) {
        return historicalSiteRepository.findAllByEnabledAndHistoricalSiteNameContaining(true, historicalSiteName, PageRequest.of(offset - 1, pagesize));
    }

}
