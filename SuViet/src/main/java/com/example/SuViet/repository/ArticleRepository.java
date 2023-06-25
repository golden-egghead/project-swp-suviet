package com.example.SuViet.repository;

import com.example.SuViet.model.Article;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
    Page<Article> findByEnabledIsTrue(Pageable pageable);

    @Query(value = "SELECT * FROM tblArticles WHERE title COLLATE Latin1_General_CI_AI LIKE %:title%", nativeQuery = true)
    Page<Article> findByTitleIgnoreCaseContaining(String title, Pageable pageable);

    Page<Article> findByEnabledIsTrueAndTagsTagNameIn(Collection<String> tagNames, Pageable pageable);

}
