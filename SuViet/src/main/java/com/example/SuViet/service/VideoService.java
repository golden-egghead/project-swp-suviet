package com.example.SuViet.service;

import com.example.SuViet.dto.VideoDTO;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface VideoService {
    List<Video> getAllVideos();

    Optional<Video> getVideoById(int id);

    Page<VideoDTO> getVideosWithPagination(int offset, int pagesize);

    List<Video> searchVideosByTitle(String title);

    Page<VideoDTO> searchVideosByTitleWithPagination(String title, int offset, int pagesize);

    List<Video> findAllByTitleAndEnabled(String title, boolean enabled);

    Video saveVideo(Video video);

    List<VideoDTO> getAllOwnVideos(User user);

    Page<VideoDTO> getOwnVideosWithPagination(int offset, int pagesize, User user);

    boolean deleteAVideo(int videoID);
}
