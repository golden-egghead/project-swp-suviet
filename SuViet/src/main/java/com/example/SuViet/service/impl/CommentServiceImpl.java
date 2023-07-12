package com.example.SuViet.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.SuViet.dto.CommentDTO;
import com.example.SuViet.dto.RepliesCommentDTO;
import com.example.SuViet.model.Article;
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

    @Override
    public List<CommentDTO> getAllEnabledComments(Article article) {
        List<Comment> comments = commentRepository.findByArticleAndEnabledOrderByCreatedDateDesc(article, true);

        List<CommentDTO> commentDTOs = CommentDTO.convertToDTOList(comments);
        commentDTOs.forEach(commentDTO -> {
            List<RepliesCommentDTO> enabledReplies = commentDTO.getRepliesComments().stream()
                    .filter(RepliesCommentDTO::isEnabled)
                    .collect(Collectors.toList());
            commentDTO.setRepliesComments(enabledReplies);
        });

        return commentDTOs;
    }

}
