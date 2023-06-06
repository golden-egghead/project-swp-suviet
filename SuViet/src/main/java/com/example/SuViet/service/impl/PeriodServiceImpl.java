package com.example.SuViet.service.impl;

import com.example.SuViet.model.Period;
import com.example.SuViet.model.Video;
import com.example.SuViet.repository.PeriodRepository;
import com.example.SuViet.service.PeriodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
public class PeriodServiceImpl implements PeriodService {

    @Autowired
    PeriodRepository periodRepository;

    @Override
    public List<Period> getAllVideos() {
        return periodRepository.findAllByEnabled(true);
    }

    @Override
    public Collection<Video> getVideosByPeriodName(String periodName) {
        return periodRepository.findByPeriodName(periodName).getVideos();
    }

    @Override
    public List<Period> getAllByPeriodName(String periodName) {
        return periodRepository.findAllByPeriodNameContaining(periodName);
    }
}
