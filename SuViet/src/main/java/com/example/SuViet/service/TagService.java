package com.example.SuViet.service;

import java.util.List;

import com.example.SuViet.model.Tag;

public interface TagService {
    public List<Tag> findByTagNames(List<String> tagNames);
}