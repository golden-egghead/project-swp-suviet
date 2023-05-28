package com.example.SuViet.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.repository.ArticleRepository;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {
    private final ArticleRepository articleRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public ArticleController(ArticleRepository articleRepository, ModelMapper modelMapper) {
        this.articleRepository = articleRepository;
        this.modelMapper = modelMapper;
    }

    @GetMapping
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        List<Article> articles = articleRepository.findAll();
        List<ArticleDTO> articleDTOs = articles.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(articleDTOs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable Long id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Article not found with id: " + id));
        ArticleDTO articleDTO = convertToDTO(article);
        return ResponseEntity.ok(articleDTO);
    }

    private ArticleDTO convertToDTO(Article article) {
        return modelMapper.map(article, ArticleDTO.class);
    }
}
