package com.example.SuViet.service;

import java.util.List;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;

public interface CommentService {
    List<Comment> getAllEnabledComments(Article article);

    public Comment savedArticleComment(Comment comment);

    public Comment getCommentById(int commentId);

}
