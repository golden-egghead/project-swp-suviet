package com.example.SuViet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.Tag;

public interface TagRepository extends JpaRepository <Tag, Integer> {

    List<Tag> findByTagNameIn(List<String> tagNames);
    
}
