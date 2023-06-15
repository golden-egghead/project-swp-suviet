package com.example.SuViet.controller;

import com.example.SuViet.model.HistoricalSite;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.HistoricalSiteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/historicalSites")
@CrossOrigin(origins = "http://localhost:3000")
public class HistoricalSiteController {

    private final HistoricalSiteService historicalSiteService;

    public HistoricalSiteController(HistoricalSiteService historicalSiteService) {
        this.historicalSiteService = historicalSiteService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllHistoricalSite(@PathVariable int offset) {
        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, 6,
                            0, 0, null)
            );
        }
        int count = 0;
        List<HistoricalSite> historicalSites = historicalSiteService.getAllHistoricalSites();
        for (int i = 0; i < historicalSites.size(); i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully",  offset, 6, count,
                        Math.ceil(count / 6.0), historicalSiteService.getHistoricalSitesWithPagination(offset, 6))
        );
    }

    @GetMapping("/search/{offset}")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponsePaginationObject> searchVideosById(@RequestParam(value = "title") String title, @PathVariable int offset) {
        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, 6,
                            0, 0, null)
            );
        }
        int count = 0;
        int countAll = 0;
        List<HistoricalSite> historicalSiteList = historicalSiteService.getAllHistoricalSitesByName(title);
        List<HistoricalSite> allHistoricalSiteList = historicalSiteService.getAllHistoricalSites();
        for (int i = 0; i < historicalSiteList.size(); i++) {
            count++;
        }

        for (int i = 0; i < allHistoricalSiteList.size(); i++) {
            countAll++;
        }
        if (title.trim().isEmpty() || title.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), historicalSiteService.getHistoricalSitesWithPagination(offset, 6))
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), historicalSiteService.getAllHistoricalSitesByName(title, offset, 6))
        );

    }

}
