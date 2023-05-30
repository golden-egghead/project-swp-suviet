package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.VideoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "/api/videos")
public class VideoController {
    private final VideoService videoService;

    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getAllVideos() {
        List<Video> videoList = videoService.getAllVideos();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", videoList)
        );
    }

<<<<<<< HEAD
=======
    @GetMapping("/sortByCreatedTime")
    public ResponseEntity<ResponseObject> getSortedVideosByCreatedTime() {
        List<Video> videoList = videoService.sortVideosByCreatedTime();
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Query successfully", videoList)
        );
    }

>>>>>>> sort-videos-by-created-time

}
