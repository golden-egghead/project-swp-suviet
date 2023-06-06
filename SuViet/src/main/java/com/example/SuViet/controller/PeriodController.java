package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.service.PeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@RequestMapping("/api/periods")
public class PeriodController {
    private final PeriodService periodService;

    public PeriodController(PeriodService periodService) {
        this.periodService = periodService;
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllPeriods() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "OK", periodService.getAllVideos())
        );
    }

    @GetMapping("/videos")
    public ResponseEntity<ResponseObject> getVideosByPeriodName(@RequestParam("periodName") String periodName) {
        Collection<Video> allVideoList = periodService.getVideosByPeriodName(periodName);
        if (allVideoList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is not video with " + periodName + " period!", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", allVideoList)
        );
    }
}
