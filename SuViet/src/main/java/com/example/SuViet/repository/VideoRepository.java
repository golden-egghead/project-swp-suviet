package com.example.SuViet.repository;

import com.example.SuViet.model.Character;
import com.example.SuViet.model.Video;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VideoRepository extends JpaRepository<Video, Integer> {
    public List<Video> findAllByEnabled(boolean enabled);

    @Query("SELECT v FROM Video v WHERE v.title LIKE %:title%")
    public List<Video> searchVideoByTitle(@Param("title") String title);
}
