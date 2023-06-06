package com.example.SuViet.service;

import com.example.SuViet.model.HistoricalSite;
import org.springframework.data.domain.Page;

import java.util.List;

public interface HistoricalSiteService {
    List<HistoricalSite> getAllHistoricalSites();
    Page<HistoricalSite> getHistoricalSitesWithPagination(int offset, int pagesize);
    List<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName);
    Page<HistoricalSite> getAllHistoricalSitesByName(String historicalSiteName, int offset, int pagesize);
}
