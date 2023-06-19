package com.example.SuViet.service;

import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;

import java.util.List;

public interface VideoService {
    List<Video> getAllVideos();

    Page<Video> getVideosWithPagination(int offset, int pagesize);

    List<Video> searchVideosByTitle(String title);

    Page<Video> searchVideosByTitleWithPagination(String title, int offset, int pagesize);

//    public List<Video> filterVideosByPeriodName(String periodName);
}
