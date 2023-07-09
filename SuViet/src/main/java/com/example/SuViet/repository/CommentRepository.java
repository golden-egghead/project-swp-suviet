package com.example.SuViet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    List<Comment> findByArticleAndEnabledOrderByCreatedDateDesc(Article article, boolean enabled);
}