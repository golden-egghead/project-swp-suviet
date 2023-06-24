package com.example.SuViet.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.SuViet.model.Tag;
import com.example.SuViet.repository.TagRepository;
import com.example.SuViet.service.TagService;


@Service
public class TagServiceImpl implements TagService {
    private final TagRepository tagRepository;

    public TagServiceImpl(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> findByTagNames(List<String> tagNames) {
        return tagRepository.findByTagNameIn(tagNames);
    }

}
