package com.example.SuViet.service;

import com.example.SuViet.model.Period;
import com.example.SuViet.model.Video;
import org.springframework.data.domain.Page;

import java.util.Collection;
import java.util.List;

public interface PeriodService {
    List<Period> getAllPeriods();
    Collection<Video> getVideosByPeriodName(String periodName);

    List<Period> getAllByPeriodName(String periodName);
}
