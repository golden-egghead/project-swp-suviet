package com.example.SuViet.controller;

import com.example.SuViet.dto.ArticleListDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.service.ArticleService;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping(path = "/api/articles")
public class ArticleController {
    private final ArticleService articleService;
    private static final int PAGE_SIZE = 6;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllEnabledArticles(@PathVariable int offset,
            @RequestParam(value = "title", defaultValue = "") String title,
            @RequestParam(value = "sortBy", defaultValue = "ArticleView") String sortBy,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, PAGE_SIZE,
                            0, 0, null)
            );
        }

        try {
            Sort.Direction direction = Sort.Direction.fromString(sortOrder);
            Sort sort = Sort.by(direction, sortBy);
            PageRequest pageRequest = PageRequest.of(offset - 1, PAGE_SIZE, sort);
            Page<ArticleListDTO> articlePage;

            if (title.isEmpty()) {
                articlePage = articleService.getAllEnabledArticles(pageRequest);
            } else {
                articlePage = articleService.searchArticlesByTitle(title, pageRequest);
            }

            List<ArticleListDTO> articleList = articlePage.getContent();
            int count = articleList.size();
            int totalPages = articlePage.getTotalPages();

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, PAGE_SIZE, count,
                            totalPages, articleList)
            );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponsePaginationObject("ERROR", "An error occurred", 0, 0, 0, 0, null));
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> postAnArticle(@RequestBody Article article) {
        try {
            Article savedArticle = articleService.savedArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("OK", "Article created successfully", savedArticle));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "An error occurred", null));
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseObject> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("ERROR", "An error occurred", null));
    }

}
