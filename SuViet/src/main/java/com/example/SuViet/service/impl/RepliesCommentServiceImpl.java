package com.example.SuViet.service.impl;

import org.springframework.stereotype.Service;

import com.example.SuViet.model.RepliesComment;
import com.example.SuViet.repository.RepliesCommentRepository;
import com.example.SuViet.service.RepliesCommentService;

@Service
public class RepliesCommentServiceImpl implements RepliesCommentService {
    private final RepliesCommentRepository repliesCommentRepository;

    public RepliesCommentServiceImpl(RepliesCommentRepository repliesCommentRepository) {
        this.repliesCommentRepository = repliesCommentRepository;
    }


    @Override
    public RepliesComment savedReplyComment(RepliesComment repliesComment) {
        return repliesCommentRepository.save(repliesComment);
    }


    @Override
    public RepliesComment getReplyCommentById(int replyId) {
        return repliesCommentRepository.findById(replyId).orElse(null);
    }
}