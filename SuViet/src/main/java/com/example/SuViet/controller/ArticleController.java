package com.example.SuViet.controller;

//
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

//
import com.example.SuViet.dto.ArticleDTO;
import com.example.SuViet.dto.CommentDTO;
import com.example.SuViet.dto.RepliesCommentDTO;
import com.example.SuViet.dto.VoteDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;
import com.example.SuViet.model.Notification;
import com.example.SuViet.model.RepliesComment;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.Tag;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.response.ResponsePaginationObject;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Vote;
import com.example.SuViet.service.ArticleService;
import com.example.SuViet.service.CommentService;
import com.example.SuViet.service.NotificationServices;
import com.example.SuViet.service.RepliesCommentService;
import com.example.SuViet.service.TagService;
import com.example.SuViet.service.UserService;
import com.example.SuViet.service.VoteService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/api/articles")
@CrossOrigin(origins = "http://localhost:3000")
public class ArticleController {
    private final ArticleService articleService;
    private final UserService userService;
    private final CommentService commentService;
    private final RepliesCommentService repliesCommentService;
    private final VoteService voteService;
    private final NotificationServices notificationServices;
    private final TagService tagService;
    private static final int PAGE_SIZE = 6;
    public static final List<String> toxicWords = Arrays.asList("khung", "dien", "vl", "khùng", "điên");

    public ArticleController(ArticleService articleService, UserService userService, CommentService commentService,
            RepliesCommentService repliesCommentService, VoteService voteService, TagService tagService,
            NotificationServices notificationServices) {
        this.articleService = articleService;
        this.userService = userService;
        this.commentService = commentService;
        this.repliesCommentService = repliesCommentService;
        this.voteService = voteService;
        this.tagService = tagService;
        this.notificationServices = notificationServices;
    }

    @GetMapping("/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllEnabledArticles(@PathVariable int offset,
            @RequestParam(value = "title", defaultValue = "") String title,
            @RequestParam(value = "tagNames", defaultValue = "") List<String> tagNames,
            @RequestParam(value = "sortBy", defaultValue = "CreatedDate") String sortBy,
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

            if (!title.isEmpty() && !tagNames.isEmpty()) {
                articlePage = articleService.searchArticlesByTitle(title, pageRequest);
                for (ArticleDTO article : articlePage.getContent()) {
                    if (article.getTagNames().containsAll(tagNames)) {

                    } else {
                        articlePage.getContent().remove(article);
                    }
                }
            } else if (!title.isEmpty()) {
                articlePage = articleService.searchArticlesByTitle(title, pageRequest);
            } else if (!tagNames.isEmpty()) {
                articlePage = articleService.filterArticlesByTagNames(tagNames, pageRequest);
            } else {
                articlePage = articleService.getAllEnabledArticles(pageRequest);
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

    @GetMapping("{articleId}/comments")
    public ResponseEntity<ResponseObject> getComments(
            @PathVariable int articleId) {

        try {
            Article article = articleService.getArticleById(articleId);
            List<CommentDTO> comments = commentService.getAllEnabledComments(article);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Get article's comment successfully", comments));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Un Error occurred", null));
        }
    }

    @GetMapping("{articleId}/votes")
    public ResponseEntity<ResponseObject> getVoteForUser(
            @PathVariable int articleId) {
        try {
            User user = userService.getUserByMail(SecurityContextHolder
                    .getContext().getAuthentication().getName());
            Article article = articleService.getArticleById(articleId);
            Vote vote = voteService.getArticleVoteByCurrentUser(article, user);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Get article's vote by current user successfully", vote));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Un Error occurred", null));
        }
    }

    @GetMapping("details/{articleId}")
    public ResponseEntity<ResponseObject> getArticleDetails(
            @PathVariable int articleId) {
        try {

            Article article = articleService.getArticleById(articleId);
            articleService.savedArticle(article);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Success", article));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "An error occur", null));
        }
    }

    @GetMapping("/pending/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllPendingArticles(@PathVariable int offset,
            @RequestParam(value = "sortBy", defaultValue = "CreatedDate") String sortBy,
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

            articlePage = articleService.getAllPendingArticles(pageRequest);

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

    @GetMapping("/owner/article/{offset}")
    public ResponseEntity<ResponsePaginationObject> getOwnerArticle(
            @PathVariable("offset") int offset,
            @RequestParam(value = "sortBy", defaultValue = "CreatedDate") String sortBy,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        if (offset <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                    new ResponsePaginationObject("FAILED",
                            "We do not have page " + offset, offset, PAGE_SIZE,
                            0, 0, null));
        }

        try {
            User currentUser = userService.getUserByMail(SecurityContextHolder
                    .getContext().getAuthentication().getName());

            Sort.Direction direction = Sort.Direction.fromString(sortOrder);
            Sort sort = Sort.by(direction, sortBy);
            PageRequest pageRequest = PageRequest.of(offset - 1, PAGE_SIZE, sort);
            Page<ArticleDTO> articleOwnerPage;

            articleOwnerPage = articleService.getAllOwnerArticle(pageRequest, currentUser);

            List<ArticleDTO> articleList = articleOwnerPage.getContent();
            int count = articleList.size();
            int totalPages = articleOwnerPage.getTotalPages();

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, PAGE_SIZE, count,
                            totalPages, articleList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponsePaginationObject("ERROR", "An error occurred",
                            0, 0, 0, 0, null));
        }
    }

    @GetMapping("/pending/comments/{offset}")
    public ResponseEntity<ResponsePaginationObject> getAllPendingComment(@PathVariable int offset,
            @RequestParam(value = "sortBy", defaultValue = "CreatedDate") String sortBy,
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
            Page<CommentDTO> commentPage;
            Page<RepliesCommentDTO> replycommentPage;

            commentPage = commentService.getAllPenddingComments(pageRequest);
            replycommentPage = repliesCommentService.getAllPendingRepliescomment(pageRequest);

            List<CommentDTO> commentList = commentPage.getContent();
            List<RepliesCommentDTO> replyCommentList = replycommentPage.getContent();
            int commentCount = commentPage.getContent().size();
            int replyCommentCount = replycommentPage.getContent().size();

            int totalCount = commentCount + replyCommentCount;
            int combinedTotalPages = (int) Math.ceil((double) totalCount / PAGE_SIZE);

            List<Object> combineList = new ArrayList<>();
            combineList.addAll(commentList);
            combineList.addAll(replyCommentList);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponsePaginationObject("OK", "Query successfully", offset, PAGE_SIZE, totalCount,
                            combinedTotalPages, combineList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponsePaginationObject("ERROR", "An error occurred", 0, 0, 0, 0, null));
        }
    }
    // @PostMapping("")
    // public ResponseEntity<ResponseObject> postAnArticle(@RequestParam String
    // data,
    // @RequestParam("file") MultipartFile file) {
    // try {
    // ObjectMapper objectMapper = new ObjectMapper();
    // ArticleDTO articleDTO = objectMapper.readValue(data, ArticleDTO.class);

    // String fileExtension = getFileExtension(file.getOriginalFilename());
    // String fileName = UUID.randomUUID().toString() + "." + fileExtension;

    // String filePathString = "src/main/resources/static/article-photo/" +
    // fileName;
    // Path filePath = Paths.get(filePathString);

    // User user =
    // userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

    // Article article = new Article();
    // // article.setTitle(filterArticleTitle(articleDTO.getTitle()));
    // // article.setContext(filterArticeContent(articleDTO.getContext()));
    // article.setTitle(articleDTO.getTitle());
    // article.setContext(articleDTO.getContext());
    // article.setPhoto(fileName.toString());
    // article.setCreatedDate(LocalDateTime.now());

    // List<String> roles = getRoleName(user.getRoles());

    // if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
    // article.setStatus(true);
    // article.setEnabled(true);
    // } else {
    // article.setStatus(false);
    // article.setEnabled(false);
    // }

    // article.setUser(user);

    // List<String> tagNames = articleDTO.getTagNames();

    // List<Tag> tags = tagService.findByTagNames(tagNames);

    // article.setTags(tags);

    // Article savedArticle = articleService.savedArticle(article);

    // Files.copy(file.getInputStream(), filePath,
    // StandardCopyOption.REPLACE_EXISTING);
    // return ResponseEntity.status(HttpStatus.CREATED).body(
    // new ResponseObject("OK", "Article created successfully", savedArticle));
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
    // new ResponseObject("ERROR", "Failed to save article", null));
    // }
    // }

    @PostMapping("")
    public ResponseEntity<ResponseObject> postAnArticle(@RequestParam String data,
            @RequestParam("file") MultipartFile file) {
        try {
            if (data == null || data.isEmpty() || file == null || file.isEmpty()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("ERROR", "Invalid input data", null));
            }

            ObjectMapper objectMapper = new ObjectMapper();
            ArticleDTO articleDTO = objectMapper.readValue(data, ArticleDTO.class);

            // Validate articleDTO and its fields

            String fileExtension = getFileExtension(file.getOriginalFilename());
            String fileName = UUID.randomUUID().toString() + "." + fileExtension;

            String destinationDir = "SuViet" + File.separator + "src" + File.separator + "main" + File.separator
                    + "resources" +
                    File.separator + "static" + File.separator + "article-photo" + File.separator;

            String filePathString = destinationDir + fileName;
            Path filePath = Paths.get(filePathString);

            User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            Article article = new Article();
            article.setTitle(articleDTO.getTitle());
            article.setContext(articleDTO.getContext());
            article.setPhoto(fileName);
            article.setCreatedDate(LocalDateTime.now());

            List<String> roles = getRoleName(user.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                article.setStatus(true);
                article.setEnabled(true);
            } else {
                article.setStatus(false);
                article.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("An article is posted");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

            article.setUser(user);

            List<String> tagNames = articleDTO.getTagNames();

            List<Tag> tags = tagService.findByTagNames(tagNames);

            article.setTags(tags);

            Article savedArticle = articleService.savedArticle(article);

            Files.createDirectories(filePath.getParent());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("OK", "Article created successfully", savedArticle));
        } catch (JsonParseException | JsonMappingException e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("ERROR", "Invalid JSON data", null));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to save article", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Internal server error", null));
        }
    }

    @PostMapping("/{articleId}/comments")
    public ResponseEntity<ResponseObject> postComment(@PathVariable("articleId") int articleId,
            @RequestBody CommentDTO commentDTO) {
        try {
            // int userID;

            // User user = userService.getUserById(userID);
            // User user = userService.getUserById(commentDTO.getUserID());
            User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
            Article article = articleService.getArticleById(articleId);

            Comment comment = new Comment();
            comment.setCommentText((commentDTO.getCommentText()));
            comment.setCreatedDate(LocalDateTime.now());
            comment.setUser(user);
            comment.setArticle(article);

            List<String> roles = getRoleName(user.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                comment.setEnabled(true);
                comment.setStatus(true);
            } else {
                comment.setStatus(false);
                comment.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("A comment is posted");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

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
            // int userID;

            // User user = userService.getUserById(userID);
            // User user = userService.getUserById(repliesCommentDTO.getUserID());
            User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
            Article article = articleService.getArticleById(articleId);
            Comment comment = commentService.getCommentById(commentId);

            RepliesComment replyComment = new RepliesComment();
            replyComment.setCommentText((repliesCommentDTO.getCommentText()));
            replyComment.setCreatedDate(LocalDateTime.now());
            replyComment.setUser(user);
            replyComment.setArticle(article);
            replyComment.setComment(comment);

            List<String> roles = getRoleName(user.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                replyComment.setEnabled(true);
                replyComment.setStatus(true);
            } else {
                replyComment.setStatus(false);
                replyComment.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("A reply comment is posted");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

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

    @PostMapping("/{articleId}/votes")
    public ResponseEntity<ResponseObject> voteArticle(
            @PathVariable("articleId") int articleID,
            @RequestBody VoteDTO voteDTO) {
        try {
            // User user = userService.getUserById(voteDTO.getUserID());
            User user = userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
            Article article = articleService.getArticleById(articleID);

            Vote vote = new Vote();
            vote.setArticle(article);
            vote.setUser(user);
            vote.setVoteLevel(voteDTO.getVoteLevel());

            Vote savedVote = voteService.savedVote(vote);

            return ResponseEntity.status(HttpStatus.CREATED).body(
                    new ResponseObject("Ok", "Voted", savedVote));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to vote", null));
        }
    }

    @PutMapping("/browse/{articleId}")
    public ResponseEntity<ResponseObject> browseArticle(
            @PathVariable("articleId") int articleId,
            @RequestParam boolean browsed) {
        try {
            Article article = articleService.getArticleById(articleId);
            User postUser = article.getUser();

            if (article.isStatus()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "This article has been"
                                + " browsed by someone", article));
            }

            if (browsed) {
                article.setEnabled(true);
                article.setStatus(true);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your article has been approved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            } else {
                article.setStatus(true);
                article.setEnabled(false);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your article has been disapproved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            }

            Article savedArticle = articleService.savedArticle(article);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Browsed", savedArticle));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to browse", null));
        }

    }

    @PutMapping("/browse/comment/{commentId}")
    public ResponseEntity<ResponseObject> browseComment(
            @PathVariable("commentId") int commentId,
            @RequestParam boolean browsed) {
        try {
            Comment comment = commentService.getCommentById(commentId);
            User postUser = comment.getUser();

            if (comment.isStatus()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "This comment has been"
                                + " browsed by someone", comment));
            }

            if (browsed) {
                comment.setEnabled(true);
                comment.setStatus(true);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your comment has been approved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            } else {
                comment.setStatus(true);
                comment.setEnabled(false);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your comments has been disapproved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            }

            Comment savedComment = commentService.savedArticleComment(comment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Browsed", savedComment));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to browse", null));
        }

    }

    @PutMapping("/browse/replycomment/{replyId}")
    public ResponseEntity<ResponseObject> browseReplyComment(
            @PathVariable("replyId") int replyId,
            @RequestParam boolean browsed) {
        try {
            RepliesComment replyComment = repliesCommentService.getReplyCommentById(replyId);
            User postUser = replyComment.getUser();

            if (replyComment.isStatus()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("OK", "This reply comment has been"
                                + " browsed by someone", replyComment));
            }

            if (browsed) {
                replyComment.setEnabled(true);
                replyComment.setStatus(true);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your reply comment has been approved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            } else {
                replyComment.setStatus(true);
                replyComment.setEnabled(false);
                Notification notification = new Notification();
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setMessage("Your reply comments has been disapproved");
                notification.setUser(postUser);
                notificationServices.createNotification(notification);
            }

            RepliesComment savedReplyComment = repliesCommentService.savedReplyComment(replyComment);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("Ok", "Browsed", savedReplyComment));

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to browse", null));
        }

    }

    @PutMapping("/report/{userId}")
    public void reportCounter(
            @PathVariable("userId") int userId) {
        try {
            User reportedUser = userService.getUserById(userId);
            reportedUser.setReported(reportedUser.getReported() + 1);
            userService.updateUser(reportedUser);
            if (reportedUser.getReported() >= 5) {
                User admin = userService.getUserByRoleName("ADMIN");
                Notification notification = new Notification();
                notification.setMessage("The user " + reportedUser.getFullname() + " is reported too many time");
                notification.setCreatedDate(LocalDateTime.now());
                notification.setEnabled(true);
                notification.setUser(admin);
                notificationServices.createNotification(notification);
            }
        } catch (Exception e) {
            return;
        }
    }

    @PutMapping("/view/{articleId}")
    public void viewCounter(
            @PathVariable("articleId") int articleId) {
        try {
            Article article = articleService.getArticleById(articleId);
            article.setArticleView(article.getArticleView() + 1);
            articleService.savedArticle(article);
        } catch (Exception e) {
            return;
        }
    }

    // @PutMapping("/{articleId}")
    // public ResponseEntity<ResponseObject> editArticle(@PathVariable("articleId")
    // int articleId,
    // @RequestParam String data,
    // @RequestParam("file") MultipartFile file) {
    // try {
    // // User currentUser =
    // //
    // userService.getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

    // // int curentUserID;

    // // User currentUser = userService.getUserById(curentUserID);
    // // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
    // // new ResponseObject("ERROR", "User is not authorized to update the
    // article",
    // // null));
    // ObjectMapper objectMapper = new ObjectMapper();
    // ArticleDTO articleDTO = objectMapper.readValue(data, ArticleDTO.class);

    // String fileExtension = getFileExtension(file.getOriginalFilename());
    // String fileName = UUID.randomUUID().toString() + "." + fileExtension;

    // // User currentUser = userService.getUserById(articleDTO.getUserID());

    // User currentUser = userService
    // .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

    // Article existingArticle = articleService.getArticleById(articleId);

    // if (!existingArticle.getUser().equals(currentUser)) {
    // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
    // new ResponseObject("ERROR", "User is not authorized to update the article",
    // null));
    // }

    // Path oldFilePath = Path.of("src/main/resources/static/article-photo/" +
    // existingArticle.getPhoto());

    // Path filePath = Path.of("src/main/resources/static/article-photo/" +
    // fileName);
    // Files.copy(file.getInputStream(), filePath,
    // StandardCopyOption.REPLACE_EXISTING);

    // existingArticle.setTitle(articleDTO.getTitle());
    // existingArticle.setContext(articleDTO.getContext());
    // existingArticle.setPhoto(fileName.toString());

    // List<String> roles = getRoleName(currentUser.getRoles());

    // if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
    // existingArticle.setStatus(true);
    // existingArticle.setEnabled(true);
    // } else {
    // existingArticle.setStatus(false);
    // existingArticle.setEnabled(false);
    // }

    // Article updatedArticle = articleService.savedArticle(existingArticle);

    // List<String> tagNames = articleDTO.getTagNames();

    // List<Tag> tags = tagService.findByTagNames(tagNames);

    // updatedArticle.setTags(tags);

    // updatedArticle = articleService.savedArticle(updatedArticle);

    // Files.deleteIfExists(oldFilePath);

    // return ResponseEntity.status(HttpStatus.OK).body(
    // new ResponseObject("OK", "Article updated successfully", updatedArticle));
    // } catch (EntityNotFoundException e) {
    // return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
    // new ResponseObject("ERROR", e.getMessage(), null));
    // } catch (Exception e) {
    // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
    // new ResponseObject("ERROR", "Failed to update article", null));
    // }
    // }

    @PutMapping("/{articleId}")
    public ResponseEntity<ResponseObject> editArticle(@PathVariable("articleId") int articleId,
            @RequestParam(required = false) String data,
            @RequestParam(value = "file", required = false) MultipartFile file) {
        try {
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());
            Article existingArticle = articleService.getArticleById(articleId);

            if (!existingArticle.getUser().equals(currentUser)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject("ERROR", "User is not authorized to update the article", null));
            }

            ArticleDTO articleDTO = null;

            if (data != null) {
                ObjectMapper objectMapper = new ObjectMapper();
                articleDTO = objectMapper.readValue(data, ArticleDTO.class);
                existingArticle.setTitle(articleDTO.getTitle());
                existingArticle.setContext(articleDTO.getContext());
            }

            if (file != null && !file.isEmpty()) {
                String fileExtension = getFileExtension(file.getOriginalFilename());
                String fileName = UUID.randomUUID().toString() + "." + fileExtension;

                String basePath = "src/main/resources/static/article-photo/";
                Path oldFilePath = Paths.get(basePath + existingArticle.getPhoto());
                Path filePath = Paths.get(basePath + fileName);

                Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                existingArticle.setPhoto(fileName);
                Files.deleteIfExists(oldFilePath);
            }

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingArticle.setStatus(true);
                existingArticle.setEnabled(true);
            } else {
                existingArticle.setStatus(false);
                existingArticle.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("An article is required to edit");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

            if (articleDTO != null) {
                List<String> tagNames = articleDTO.getTagNames();
                List<Tag> tags = tagService.findByTagNames(tagNames);
                existingArticle.setTags(tags);
            }
            Article updatedArticle = articleService.savedArticle(existingArticle);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Article updated successfully", updatedArticle));
        } catch (JsonParseException | JsonMappingException e) {
            return ResponseEntity.badRequest().body(
                    new ResponseObject("ERROR", "Invalid JSON data", null));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to update article", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Internal server error", null));
        }
    }

    @PutMapping("/{articleId}/comments/{commentId}")
    public ResponseEntity<ResponseObject> editComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @RequestBody CommentDTO commentDTO) {
        try {
            Comment existingComment = commentService.getCommentById(commentId);

            // User currentUser = userService.getUserById(commentDTO.getUserID());
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            if (!existingComment.getUser().equals(currentUser)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject("ERROR", "User is not authorized to update the comment", null));
            }

            existingComment.setCommentText((commentDTO.getCommentText()));

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingComment.setStatus(true);
                existingComment.setEnabled(true);
            } else {
                existingComment.setStatus(false);
                existingComment.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("A comment is required to edit");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

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

    @PutMapping("/{articleId}/comments/{commentId}/replies/{replyId}")
    public ResponseEntity<ResponseObject> editReplyComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @PathVariable("replyId") int replyId,
            @RequestBody RepliesCommentDTO repliesCommentDTO) {
        try {
            RepliesComment existingReplyComment = repliesCommentService.getReplyCommentById(replyId);

            // User currentUser = userService.getUserById(repliesCommentDTO.getUserID());
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            if (!existingReplyComment.getUser().equals(currentUser)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        new ResponseObject("ERROR", "User is not authorized to update the comment", null));
            }

            existingReplyComment.setCommentText(repliesCommentDTO.getCommentText());

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingReplyComment.setStatus(true);
                existingReplyComment.setEnabled(true);
            } else {
                existingReplyComment.setStatus(false);
                existingReplyComment.setEnabled(true);

                List<User> moderators = userService.getUsersWithModeratorRole("MODERATOR");
                for (int i = 0; i < moderators.size(); i++) {
                    Notification notification = new Notification();
                    notification.setCreatedDate(LocalDateTime.now());
                    notification.setEnabled(true);
                    notification.setMessage("A reply comment is required to edit");
                    notification.setUser(moderators.get(i));
                    notificationServices.createNotification(notification);
                }
            }

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

    @PutMapping("/{articleId}/vote/{voteId}")
    public ResponseEntity<ResponseObject> changeVote(@PathVariable("articleId") int articleId,
            @PathVariable("voteId") int voteId,
            @RequestBody VoteDTO voteDTO) {
        try {
            Vote existingVote = voteService.getVoteById(voteId);

            existingVote.setVoteLevel(voteDTO.getVoteLevel());

            Vote updatedVote = voteService.savedVote(existingVote);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Vote Changed", updatedVote));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ResponseObject("ERROR", e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "Failed to change vote", null));
        }

    }

    @DeleteMapping("/{articleId}")
    public ResponseEntity<ResponseObject> deleteArticle(@PathVariable("articleId") int articleId) {
        try {
            Article existingArticle = articleService.getArticleById(articleId);
            User ownerUser = existingArticle.getUser();
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingArticle.setEnabled(false);
            } else {
                if (!ownerUser.equals(currentUser)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                            new ResponseObject("ERROR", "User is not authorized to update this article", null));
                } else {
                    existingArticle.setEnabled(false);
                }
            }

            Article deletedArticle = articleService.savedArticle(existingArticle);
            Notification notification = new Notification();
            notification.setCreatedDate(LocalDateTime.now());
            notification.setEnabled(true);
            if (currentUser.equals(existingArticle.getUser())) {
                notification.setMessage("Your article successful deleted");
            } else {
                notification.setMessage("Your article has been deleted by "
                        + currentUser.getFullname());
            }

            notification.setUser(existingArticle.getUser());
            notificationServices.createNotification(notification);
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

    @DeleteMapping("/{articleId}/comments/{commentId}")
    public ResponseEntity<ResponseObject> deleteComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId) {
        try {
            Comment existingComment = commentService.getCommentById(commentId);
            User ownerUser = existingComment.getUser();
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingComment.setEnabled(false);
            } else {
                if (!ownerUser.equals(currentUser)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                            new ResponseObject("ERROR", "User is not authorized to update this comment", null));
                } else {
                    existingComment.setEnabled(false);
                }
            }

            Comment deletedComment = commentService.savedArticleComment(existingComment);
            Notification notification = new Notification();
            notification.setCreatedDate(LocalDateTime.now());
            notification.setEnabled(true);
            if (currentUser.equals(existingComment.getUser())) {
                notification.setMessage("Your comment successful deleted");
            } else {
                notification.setMessage("Your comment has been deleted by "
                        + currentUser.getFullname());
            }

            notification.setUser(existingComment.getUser());
            notificationServices.createNotification(notification);
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

    @DeleteMapping("/{articleId}/comments/{commentId}/replies/{replyId}")
    public ResponseEntity<ResponseObject> deleteReplyComment(@PathVariable("articleId") int articleId,
            @PathVariable("commentId") int commentId,
            @PathVariable("replyId") int replyId) {
        try {
            RepliesComment existingReplyComment = repliesCommentService.getReplyCommentById(replyId);

            User ownerUser = existingReplyComment.getUser();
            User currentUser = userService
                    .getUserByMail(SecurityContextHolder.getContext().getAuthentication().getName());

            List<String> roles = getRoleName(currentUser.getRoles());

            if (roles.contains("MODERATOR") || roles.contains("ADMIN")) {
                existingReplyComment.setEnabled(false);
            } else {
                if (!ownerUser.equals(currentUser)) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                            new ResponseObject("ERROR", "User is not authorized to update this  reply comment", null));
                } else {
                    existingReplyComment.setEnabled(false);
                }
            }

            RepliesComment deletedReplyComment = repliesCommentService.savedReplyComment(existingReplyComment);
            Notification notification = new Notification();
            notification.setCreatedDate(LocalDateTime.now());
            notification.setEnabled(true);
            if (currentUser.equals(existingReplyComment.getUser())) {
                notification.setMessage("Your reply comment successful deleted");
            } else {
                notification.setMessage("Your reply comment has been deleted by "
                        + currentUser.getFullname());
            }

            notification.setUser(existingReplyComment.getUser());
            notificationServices.createNotification(notification);
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

    public static String filterArticeContent(String originalString) {
        String[] splitString = originalString.split(System.lineSeparator());
        String resultString = "";
        for (String string : splitString) {
            resultString += "<p>" + string + "</p>";
        }

        return resultString;
    }

    public static String filterArticleTitle(String originalString) {
        return "<h1>" + originalString + "</h1>";
    }

    public static String filterToxic(String originalString) {

        for (String word : toxicWords) {
            String pattern = "(?i)\\b" + word + "\\b";
            String replacement = "*".repeat(word.length());
            originalString = originalString.replaceAll(pattern, replacement);
        }

        return originalString;
    }

    private String getFileExtension(String filename) {
        int dotIndex = filename.lastIndexOf('.');
        if (dotIndex > 0 && dotIndex < filename.length() - 1) {
            return filename.substring(dotIndex + 1);
        }
        return "";
    }

    private static List<String> getRoleName(Collection<Role> roles) {
        if (roles.isEmpty()) {
            return null;
        }

        return roles.stream().map(Role::getRoleName).collect(Collectors.toList());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseObject> handleException(Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                new ResponseObject("ERROR", "An error occurred", null));
    }

}
