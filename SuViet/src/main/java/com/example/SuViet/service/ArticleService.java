package com.example.SuViet.service;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.model.User;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    Page<ArticleDTO> getAllEnabledArticles(Pageable pageable);

    Page<ArticleDTO> getAllPendingArticles(Pageable pageable);

    Page<ArticleDTO> getAllOwnerArticle(Pageable pageable, User user);

    Page<ArticleDTO> searchArticlesByTitle(String title, Pageable pageable);

    public Page<ArticleDTO> filterArticlesByTagNames(List<String> tagNames, Pageable pageable);

    Article savedArticle(Article article);

    public Article getArticleById(int articleId);
}
