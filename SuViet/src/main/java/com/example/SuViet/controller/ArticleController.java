package com.example.SuViet.controller;

import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.dto.CommentDTO;
import com.example.SuViet.dto.RepliesCommentDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;
import com.example.SuViet.model.RepliesComment;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.ResponsePaginationObject;
import com.example.SuViet.model.User;
import com.example.SuViet.service.ArticleService;
import com.example.SuViet.service.CommentService;
import com.example.SuViet.service.RepliesCommentService;
import com.example.SuViet.service.UserService;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping(path = "/api/articles")
public class ArticleController {
    private final ArticleService articleService;
    private final UserService userService;
    private final CommentService commentService;
    private final RepliesCommentService repliesCommentService;
    private static final int PAGE_SIZE = 6;

    public ArticleController(ArticleService articleService, UserService userService, CommentService commentService,
            RepliesCommentService repliesCommentService) {
        this.articleService = articleService;
        this.userService = userService;
        this.commentService = commentService;
        this.repliesCommentService = repliesCommentService;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllEnabledArticles(@PathVariable int offset,
            @RequestParam(value = "title", defaultValue = "") String title,
            @RequestParam(value = "sortBy", defaultValue = "ArticleView") String sortBy,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponsePaginationObject("FAILED", "We do not have page " + offset, offset, PAGE_SIZE,
                            0, 0, null));
        }

        try {
            Sort.Direction direction = Sort.Direction.fromString(sortOrder);
            Sort sort = Sort.by(direction, sortBy);
            PageRequest pageRequest = PageRequest.of(offset - 1, PAGE_SIZE, sort);
            Page<ArticleDTO> articlePage;

            if (title.isEmpty()) {
                articlePage = articleService.getAllEnabledArticles(pageRequest);
            } else {
                articlePage = articleService.searchArticlesByTitle(title, pageRequest);
            }

            List<ArticleDTO> articleList = articlePage.getContent();
            int count = articleList.size();
            int totalPages = articlePage.getTotalPages();

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, PAGE_SIZE, count,
                            totalPages, articleList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponsePaginationObject("ERROR", "An error occurred", 0, 0, 0, 0, null));
        }
    }

    @PostMapping("")
    public ResponseEntity<ResponseObject> postAnArticle(@RequestBody ArticleDTO articleDTO) {
        try {
            User user = userService.getUserById(articleDTO.getUserID());

            Article article = new Article();
            article.setTitle(articleDTO.getTitle());
            article.setContext(articleDTO.getContext());
            article.setPhoto(articleDTO.getPhoto());
            article.setCreatedDate(LocalDateTime.now());
            article.setStatus(false);
            article.setEnabled(true);
            article.setUser(user);

            Article savedArticle = articleService.savedArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("OK", "Article created successfully", savedArticle));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to save article", null));
        }
    }

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<ResponseObject> postComment(@PathVariable("articleId") int articleId,
            @RequestBody CommentDTO commentDTO) {
        try {
            User user = userService.getUserById(commentDTO.getUserID());
            Article article = articleService.getArticleById(articleId);

            Comment comment = new Comment();
            comment.setCommentText(commentDTO.getCommentText());
            comment.setEnabled(true);
            comment.setCreatedDate(LocalDateTime.now());
            comment.setUser(user);
            comment.setArticle(article);

            Comment savedComment = commentService.savedArticleComment(comment);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("Ok", "Comment created successfully", savedComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to save comment", null));
        }
    }

    @PostMapping("/{articleId}/comments/{commentId}/reply")
    public ResponseEntity<ResponseObject> postAReplyComment(
            @PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @RequestBody RepliesCommentDTO repliesCommentDTO) {
        try {
            User user = userService.getUserById(repliesCommentDTO.getUserID());
            Article article = articleService.getArticleById(articleId);
            Comment comment = commentService.getCommentById(commentId);

            RepliesComment replyComment = new RepliesComment();
            replyComment.setCommentText(repliesCommentDTO.getCommentText());
            replyComment.setEnabled(true);
            replyComment.setCreatedDate(LocalDateTime.now());
            replyComment.setUser(user);
            replyComment.setArticle(article);
            replyComment.setComment(comment);

            RepliesComment savedReplyComment = repliesCommentService.savedReplyComment(replyComment);
            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("OK", "Reply comment created successfully", savedReplyComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to save reply comment", null));
        }
    }

    @PutMapping("/{articleId}")
    public ResponseEntity<ResponseObject> editArticle(@PathVariable("articleId") int articleId,
            @RequestBody ArticleDTO articleDTO) {
        try {
            Article existingArticle = articleService.getArticleById(articleId);

            // Check if the article belongs to the authenticated user

            // Validate ownership

            // Update the existing article with the new data
            existingArticle.setTitle(articleDTO.getTitle());
            existingArticle.setContext(articleDTO.getContext());
            existingArticle.setPhoto(articleDTO.getPhoto());

            Article updatedArticle = articleService.savedArticle(existingArticle);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Article updated successfully", updatedArticle));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to update article", null));
        }
    }

    @DeleteMapping("/{articleId}")
    public ResponseEntity<ResponseObject> deleteArticle(@PathVariable("articleId") int articleId) {
        try {
            Article existingArticle = articleService.getArticleById(articleId);

            // Check if the article belongs to the authenticated user

            // Validate ownership

            // Soft delete the article by setting enabled to false
            existingArticle.setEnabled(false);

            Article deletedArticle = articleService.savedArticle(existingArticle);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Article deleted successfully", deletedArticle));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to delete article", null));
        }
    }

    @PutMapping("/{articleId}/comments/{commentId}")
    public ResponseEntity<ResponseObject> editComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @RequestBody CommentDTO commentDTO) {
        try {
            Comment existingComment = commentService.getCommentById(commentId);

            // Check if the comment belongs to the authenticated user

            // Validate ownership

            // Update the existing comment with the new data
            existingComment.setCommentText(commentDTO.getCommentText());

            Comment updatedComment = commentService.savedArticleComment(existingComment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Comment updated successfully", updatedComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to update comment", null));
        }
    }

    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseEntity<ResponseObject> deleteComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId) {
        try {
            Comment existingComment = commentService.getCommentById(commentId);

            // Check if the comment belongs to the authenticated user

            // Validate ownership

            // Soft delete the comment by setting enabled to false
            existingComment.setEnabled(false);

            Comment deletedComment = commentService.savedArticleComment(existingComment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Comment deleted successfully", deletedComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to delete comment", null));
        }
    }

    @PutMapping("/{articleId}/comments/{commentId}/replies/{replyId}")
    public ResponseEntity<ResponseObject> editReplyComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @PathVariable("replyId") int replyId,
            @RequestBody RepliesCommentDTO repliesCommentDTO) {
        try {
            RepliesComment existingReplyComment = repliesCommentService.getReplyCommentById(replyId);

            // Check if the reply comment belongs to the authenticated user

            // Validate ownership

            // Update the existing reply comment with the new data
            existingReplyComment.setCommentText(repliesCommentDTO.getCommentText());

            RepliesComment updatedReplyComment = repliesCommentService.savedReplyComment(existingReplyComment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Reply comment updated successfully", updatedReplyComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to update reply comment", null));
        }
    }

    @DeleteMapping("/{articleId}/comments/{commentId}/replies/{replyId}")
    public ResponseEntity<ResponseObject> deleteReplyComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @PathVariable("replyId") int replyId) {
        try {
            RepliesComment existingReplyComment = repliesCommentService.getReplyCommentById(replyId);

            // Check if the reply comment belongs to the authenticated user

            // Validate ownership

            // Soft delete the reply comment by setting enabled to false
            existingReplyComment.setEnabled(false);

            RepliesComment deletedReplyComment = repliesCommentService.savedReplyComment(existingReplyComment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Reply comment deleted successfully", deletedReplyComment));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to delete reply comment", null));
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseObject> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("ERROR", "An error occurred", null));
    }

}
