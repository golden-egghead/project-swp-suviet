package com.example.SuViet.service.impl;

import org.springframework.stereotype.Service;

import com.example.SuViet.model.Comment;
import com.example.SuViet.repository.CommentRepository;
import com.example.SuViet.service.CommentService;


@Service
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;

    public CommentServiceImpl(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    @Override
    public Comment savedArticleComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Override
    public Comment getCommentById(int commentId) {
        return commentRepository.findById(commentId).orElse(null);
    }
}