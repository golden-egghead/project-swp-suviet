package com.example.SuViet.controller;

import com.example.SuViet.dto.VideoDTO;
import com.example.SuViet.model.Period;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.repository.VideoRepository;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.model.Video;
import com.example.SuViet.service.UserService;
import com.example.SuViet.service.VideoService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path = "/api/videos")
    @CrossOrigin(origins = "http://localhost:3000")

public class VideoController {

    @Autowired
    VideoRepository videoRepository;

    @Autowired
    PeriodRepository periodRepository;
    private final VideoService videoService;

    private final UserService userService;

    public VideoController(VideoService videoService, UserService userService) {
        this.videoService = videoService;
        this.userService = userService;
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

    @PostMapping("/upload-video")
    public ResponseEntity<ResponseObject> uploadAVideo(@RequestBody VideoDTO newVideo) {
        List<Video> videos = videoService.findAllByTitleAndEnabled(newVideo.getTitle(), true);
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        if (videos.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Video has already exist!", null)
            );
        } else {
            Video video = new Video();
            BeanUtils.copyProperties(newVideo, video);
            video.setCreatedDate(LocalDateTime.now());
            video.setUser(user);
            List<String> periodNames = newVideo.getPeriodName();
            List<Period> periods = new ArrayList<>();
//            String periodName = newVideo.getPeriodName().get(0);
            for (int i = 0; i < periodNames.size(); i++) {
                Period period = periodRepository.findByPeriodName(periodNames.get(0));
                periods.add(period);
            }

            if (periods.size() <= 0) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "Cannot find out period", null)
                );
            }
            video.setPeriods(periods);
            video.setEnabled(true);
            System.out.println(video);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Saved...", videoService.saveVideo(video))
            );
        }

    }

    @PutMapping("/update-video/{videoID}")
    public ResponseEntity<ResponseObject> updateAVideo(@PathVariable int videoID,
                                                       @RequestBody Video newVideo) {
        User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
        Video video = videoService.getVideoById(videoID).get();
        if (user != video.getUser()) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "You cannot update this video!", videoService.saveVideo(newVideo))
            );
        } else {
            if (video != null) {
                video.setTitle(newVideo.getTitle());
                video.setVideo(newVideo.getVideo());
                video.setDescription(newVideo.getDescription());
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "Updated...", videoService.saveVideo(newVideo))
                );
            } else {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new ResponseObject("FAILED", "There is no video with id: " + videoID, videoService.saveVideo(newVideo))
                );
            }
        }

    }


}
