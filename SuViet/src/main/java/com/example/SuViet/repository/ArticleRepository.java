package com.example.SuViet.repository;

import java.util.Collection;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.User;

public interface ArticleRepository extends JpaRepository<Article, Integer> {
        Page<Article> findByEnabledIsTrueAndStatusIsTrueAndUserEnabledIsTrue(Pageable pageable);

        Page<Article> findByEnabledIsTrueAndStatusIsFalseAndUserEnabledIsTrue(Pageable pageable);

        Page<Article> findByUser(Pageable pageable, User user);

        // @Query(value = "SELECT * FROM tblArticles WHERE title COLLATE
        // Latin1_General_CI_AI LIKE %:title% AND enabled = 1", nativeQuery = true)
        // Page<Article> findByTitleIgnoreCaseContainingAndEnabledIsTrue(String title,
        // Pageable pageable);

        // @Query(value = "SELECT * FROM tblArticles WHERE title COLLATE
        // Latin1_General_CI_AI LIKE %:title% AND enabled = 1 AND status = 1",
        // nativeQuery = true)
        // Page<Article>
        // findByTitleIgnoreCaseContainingAndEnabledIsTrueAndStatusIsTrueAndUserEnabledIsTrue(String
        // title, Pageable pageable);

        @Query(value = "SELECT a.* FROM tblArticles a " +
                        "JOIN tblUsers u ON a.UserID = u.UserID " +
                        "WHERE a.title COLLATE Latin1_General_CI_AI LIKE %:title% " +
                        "AND a.enabled = 1 " +
                        "AND a.status = 1 " +
                        "AND u.enabled = 1", nativeQuery = true)
        Page<Article> findByTitleIgnoreCaseContainingAndEnabledIsTrueAndStatusIsTrueAndUserEnabledIsTrue(
                        @Param("title") String title, Pageable pageable);

        Page<Article> findByEnabledIsTrueAndTagsTagNameInAndUserEnabledIsTrue(Collection<String> tagNames,
                        Pageable pageable);

}
