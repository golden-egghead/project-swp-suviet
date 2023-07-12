package com.example.SuViet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    // List<Comment> findByArticleAndEnabledOrderByCreatedDateDesc(Article article, boolean enabled);
	@Query("SELECT DISTINCT c FROM Comment c LEFT JOIN FETCH c.repliesComments r WHERE c.article = :article AND c.enabled = :enabled AND (r.enabled = :enabled OR r IS NULL) ORDER BY c.createdDate DESC")
    List<Comment> findByArticleAndEnabledOrderByCreatedDateDesc(Article article, boolean enabled);
}
