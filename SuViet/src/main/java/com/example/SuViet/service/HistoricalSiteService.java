package com.example.SuViet.service;

import com.example.SuViet.model.HistoricalSite;
import com.example.SuViet.model.User;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HistoricalSiteService {
    List<HistoricalSite> getAllHistoricalSites();
    Optional<HistoricalSite> getHistoricalSiteByID(int id);
    Page<HistoricalSite> getHistoricalSitesWithPagination(int offset, int pagesize);
    List<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName);
    Page<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName, int offset, int pagesize);

    List<HistoricalSite> getAllOwnHistoricalSites(User user);

    List<HistoricalSite> findAllByNameAndEnabled(String historicalSiteName, boolean enabled);

    HistoricalSite saveHistoricalSite(HistoricalSite historicalSite);

    boolean deleteAHistoricalSite(int id);
}
