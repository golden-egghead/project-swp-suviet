package com.example.SuViet.service.impl;

import com.example.SuViet.dto.VideoDTO;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Video;
import com.example.SuViet.repository.VideoRepository;
import com.example.SuViet.service.VideoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VideoServiceImpl implements VideoService {
    private final VideoRepository videoRepository;


    public VideoServiceImpl(VideoRepository videoRepository) {
        this.videoRepository = videoRepository;
    }

    @Autowired


    @Override
    public List<Video> getAllVideos() {
        return videoRepository.findAllByEnabled(true);
    }

    @Override
    public Optional<Video> getVideoById(int id) {
        return videoRepository.findById(id);
    }


    @Override
    public Page<VideoDTO> getVideosWithPagination(int offset, int pagesize) {
        Page<Video> videos = videoRepository.findAllByEnabled(true, PageRequest.of(offset - 1, pagesize));
        return videos.map(video -> VideoDTO.convertToDTO(video));
    }

    @Override
    public List<Video> searchVideosByTitle(String title) {
        return videoRepository.findAllByTitleContainingAndEnabled(title, true);
    }

    @Override
    public Page<VideoDTO> searchVideosByTitleWithPagination(String title, int offset, int pagesize) {
        Page<Video> videos = videoRepository.findAllByTitleContainingAndEnabled(title, true, PageRequest.of(offset - 1, pagesize));
        return videos.map(video -> VideoDTO.convertToDTO(video));
    }

    @Override
    public List<Video> findAllByTitleAndEnabled(String title, boolean enabled) {
        if (videoRepository.findAllByTitleAndEnabled(title, enabled) == null) {
            return null;
        }
        return videoRepository.findAllByTitleAndEnabled(title, enabled);
    }

    @Override
    public Video saveVideo(Video video) {
        return videoRepository.save(video);
    }

    @Override
    public List<VideoDTO> getAllOwnVideos(User user) {
        List<Video> videos = videoRepository.findAllByEnabled(true);
        List<VideoDTO> videoDTOS = videos.stream().map(video -> VideoDTO.convertToDTO(video)).collect(Collectors.toList());
        List<VideoDTO> filteredVideos = new ArrayList<>();
        for (VideoDTO vid : videoDTOS) {
            if (vid.getEmail() == "" || vid.getEmail() == user.getMail()) {
                filteredVideos.add(vid);
            }
        }
        return filteredVideos;
    }

    @Override
    public Page<VideoDTO> getOwnVideosWithPagination(int offset, int pagesize, User user) {
        Page<VideoDTO> videos = new PageImpl<VideoDTO>(getAllOwnVideos(user), PageRequest.of(offset - 1, pagesize) , getAllOwnVideos(user).size());
        return videos;
    }

    @Override
    public boolean deleteAVideo(int videoID) {
        Video videoDelete = videoRepository.findById(videoID).get();
        try {
            if (videoDelete.isEnabled()) {
                videoDelete.setEnabled(false);
            } else  {
                videoDelete.setEnabled(true);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }


//    @Override
//    public List<Video> filterVideosByPeriodName(String periodName) {
//        return videoRepository.findAllByPeriodName(periodName, true);
//    }

}
