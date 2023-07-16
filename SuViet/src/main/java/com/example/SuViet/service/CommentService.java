package com.example.SuViet.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.SuViet.dto.CommentDTO;
import com.example.SuViet.model.Article;
import com.example.SuViet.model.Comment;

public interface CommentService {
    List<CommentDTO> getAllEnabledComments(Article article);

    Page<CommentDTO> getAllPenddingComments(Pageable pageable);

    public Comment savedArticleComment(Comment comment);

    public Comment getCommentById(int commentId);

}
