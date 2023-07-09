package com.example.SuViet.dto;


import com.example.SuViet.model.Period;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Video;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class VideoDTO {
    private int videoID;

    private String title;

    private String video;

    private String description;

    private LocalDateTime createdDate;

    private boolean enabled;

    private Collection<Integer> periodID;

    private List<String> periodName;

    private String email;

    private String fullname;

    public static VideoDTO convertToDTO(Video video) {
        VideoDTO videoDTO = new VideoDTO();
        videoDTO.setVideoID(video.getVideoID());
        videoDTO.setTitle(video.getTitle());
        videoDTO.setVideo(video.getVideo());
        videoDTO.setEnabled(video.isEnabled());
        videoDTO.setDescription(video.getDescription());
        videoDTO.setPeriodID(video.getPeriods().stream().map(period -> period.getPeriodID()).collect(Collectors.toList()));
        videoDTO.setPeriodName(video.getPeriods().stream().map(period -> period.getPeriodName()).collect(Collectors.toList()));
        videoDTO.setCreatedDate(video.getCreatedDate());
        if (video.getUser() == null) {
            videoDTO.setEmail("");
            videoDTO.setFullname("");
        } else {
            videoDTO.setEmail(video.getUser().getMail());
            videoDTO.setFullname(video.getUser().getFullname());
        }
        return videoDTO;
    }
}
