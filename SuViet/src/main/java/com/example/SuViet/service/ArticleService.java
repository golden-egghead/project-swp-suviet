package com.example.SuViet.service;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.model.Article;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    Page<ArticleDTO> getAllEnabledArticles(Pageable pageable);

    Page<ArticleDTO> getAllUnBrowserArtices(Pageable pageable);

    Page<ArticleDTO> searchArticlesByTitle(String title, Pageable pageable);

    public Page<ArticleDTO> filterArticlesByTagNames(List<String> tagNames, Pageable pageable);

    Article savedArticle(Article article);

    public Article getArticleById(int articleId);
}
