package com.example.SuViet.service;

import com.example.SuViet.model.Period;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;

public interface PeriodService {
    public List<Period> getAllVideos();
    public Collection<Video> getVideosByPeriodName(String periodName);

    public List<Period> getAllByPeriodName(String periodName);
}
