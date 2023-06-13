package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/videos")
    @CrossOrigin(origins = "http://localhost:3000")

public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllVideos(@PathVariable int offset) {
        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, 6,
                            0, 0, null)
            );
        }
        int count = 0;
        List<Video> videoList = videoService.getAllVideos();
        for (int i = 0; i < videoList.size(); i++) {
            count++;
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully",  offset, 6, count,
                        Math.ceil(count / 6.0), videoService.getVideosWithPagination(offset, 6))
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
        List<Video> videoList = videoService.searchVideosByTitle(title);
        List<Video> allVideoList = videoService.getAllVideos();
        for (int i = 0; i < videoList.size(); i++) {
            count++;
        }

        for (int i = 0; i < allVideoList.size(); i++) {
            countAll++;
        }
        if (title.trim().isEmpty() || title.trim() == "") {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, 6, countAll,
                            Math.ceil(countAll / 6.0), videoService.getVideosWithPagination(offset, 6))
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponsePaginationObject("OK", "Query successfully", offset, 6, count,
                        Math.ceil(count / 6.0), videoService.searchVideosByTitleWithPagination(title, offset, 6))
        );

    }


}
