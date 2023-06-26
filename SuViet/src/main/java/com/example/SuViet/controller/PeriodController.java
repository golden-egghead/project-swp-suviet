package com.example.SuViet.controller;

import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.PeriodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/periods")
@CrossOrigin(origins = "http://localhost:3000")
public class PeriodController {
    private final PeriodService periodService;

    public PeriodController(PeriodService periodService) {
        this.periodService = periodService;
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllPeriods() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "OK", periodService.getAllPeriods())
        );
    }

    @GetMapping("/videos")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> getVideosByPeriodName(@RequestParam("periodName") String periodName) {
        if (periodName.isEmpty() == true && periodName.trim() == ""){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "OK", periodService.getAllPeriods())
            );
        }
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
