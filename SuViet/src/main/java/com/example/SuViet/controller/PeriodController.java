package com.example.SuViet.controller;

import com.example.SuViet.model.Character;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.CharacterService;
import com.example.SuViet.service.PeriodService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api/period")
@CrossOrigin(origins = "http://localhost:3000")
public class PeriodController {
    private final PeriodService periodService;
    private final CharacterService characterService;
    public PeriodController(PeriodService periodService, CharacterService characterService) {
        this.periodService = periodService;
        this.characterService = characterService;
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
        if (allVideoList == null) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is not video with " + periodName + " period!", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", allVideoList)
        );
    }

    @GetMapping("/characters")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<ResponseObject> getCharactersByPeriodName(@RequestParam("periodName") String periodName) {
        if (periodName.isEmpty() == true && periodName.trim() == ""){
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "OK", periodService.getAllPeriods())
            );
        }
       List<Character> allCharacterList = characterService.getCharacterByPeriod(periodName);
        if (allCharacterList.size() == 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "There is not video with " + periodName + " period!", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", allCharacterList)
        );
    }
}
