package com.example.SuViet.service;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.model.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public interface ArticleService {

    Page<ArticleDTO> getAllEnabledArticles(Pageable pageable);

    Page<ArticleDTO> searchArticlesByTitle(String title, PageRequest pageRequest);

    Article savedArticle(Article article);
    
    public Article getArticleById(int articleId);
}
