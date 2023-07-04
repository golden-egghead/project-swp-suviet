package com.example.SuViet.service.impl;

import com.example.SuViet.dto.VideoDTO;
import com.example.SuViet.model.HistoricalSite;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Video;
import com.example.SuViet.repository.HistoricalSiteRepository;
import com.example.SuViet.service.HistoricalSiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public Optional<HistoricalSite> getHistoricalSiteByID(int id) {
        return historicalSiteRepository.findById(id);
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

    @Override
    public List<HistoricalSite> getAllOwnHistoricalSites(User user) {
        List<HistoricalSite> historicalSites = historicalSiteRepository.findAllByEnabled(true);
        List<HistoricalSite> filteredHistoricalSites = new ArrayList<>();
        for (HistoricalSite historicalSite : historicalSites) {
            if (historicalSite.getUser() == null || historicalSite.getUser() == user) {
                filteredHistoricalSites.add(historicalSite);
            }
        }
        return filteredHistoricalSites;
    }

    @Override
    public List<HistoricalSite> findAllByNameAndEnabled(String historicalSiteName, boolean enabled) {
        return historicalSiteRepository.findAllByHistoricalSiteNameAndEnabled(historicalSiteName, enabled);
    }

    @Override
    public HistoricalSite saveHistoricalSite(HistoricalSite historicalSite) {
        try {
            return historicalSiteRepository.save(historicalSite);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean deleteAHistoricalSite(int id) {
        HistoricalSite historicalSite = historicalSiteRepository.findById(id).get();
        try {
            if (historicalSite.isEnabled()) {
                historicalSite.setEnabled(false);
            } else {
                historicalSite.setEnabled(true);
            }
            return true;
        } catch (Exception e) {
            return false;
        }

    }

}
