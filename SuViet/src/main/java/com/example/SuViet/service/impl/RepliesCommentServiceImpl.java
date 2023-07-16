package com.example.SuViet.service.impl;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.SuViet.dto.RepliesCommentDTO;
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

    @Override
    public Page<RepliesCommentDTO> getAllPendingRepliescomment(Pageable pageable) {
        Page<RepliesComment> reppliescommentPage = repliesCommentRepository
                .findByEnabledIsTrueAndStatusIsFalse(pageable);
        return reppliescommentPage.map(RepliesCommentDTO::convertToDTO);
    }
}