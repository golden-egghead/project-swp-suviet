package com.example.SuViet.service.impl;

import com.example.SuViet.model.Video;
import com.example.SuViet.repository.VideoRepository;
import com.example.SuViet.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;
    @Autowired
    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }


    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAllByEnabled(true);
<<<<<<< HEAD
=======
    }

    @Override
    public List<Video> sortVideosByCreatedTime() {
        List<Video> videos = getAllVideos();
        videos.sort(Comparator.comparing(Video::getCreatedDate));
        return videos;
>>>>>>> sort-videos-by-created-time
    }

}
