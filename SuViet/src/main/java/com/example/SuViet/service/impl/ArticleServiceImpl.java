package com.example.SuViet.service.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.repository.ArticleRepository;
import com.example.SuViet.service.ArticleService;

@Service
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    @Override
    public Page<ArticleDTO> getAllEnabledArticles(Pageable pageable) {
        Page<Article> articlesPage = articleRepository.findByEnabledIsTrueAndStatusIsTrue(pageable);
        return articlesPage.map(ArticleDTO::convertToDTO);
    }

    @Override
    public Page<ArticleDTO> getAllUnBrowserArtices(Pageable pageable) {
        Page<Article> articlPage = articleRepository.findByEnabledIsFalseAndStatusIsFalse(pageable);
        return articlPage.map(ArticleDTO::convertToDTO);
    }

    @Override
    public Page<ArticleDTO> searchArticlesByTitle(String title, Pageable pageable) {
        Page<Article> articlesPage = articleRepository.findByTitleIgnoreCaseContainingAndEnabledIsTrue(title, pageable);
        return articlesPage.map(ArticleDTO::convertToDTO);
    }

    @Override
    public Page<ArticleDTO> filterArticlesByTagNames(List<String> tagNames,
            Pageable pageable) {
        Page<Article> articlesPage = articleRepository.findByEnabledIsTrueAndTagsTagNameIn(tagNames, pageable);
        return articlesPage.map(ArticleDTO::convertToDTO);
    }

    @Override
    public Article savedArticle(Article article) {
        return articleRepository.save(article);
    }

    @Override
    public Article getArticleById(int articleId) {
        return articleRepository.findById(articleId).orElse(null);
    }
}
