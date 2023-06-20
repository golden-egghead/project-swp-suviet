package com.example.SuViet.service;

import com.example.SuViet.model.Comment;

public interface CommentService {

    public Comment savedArticleComment(Comment comment);

    public Comment getCommentById(int commentId);

}
