package com.example.SuViet.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.SuViet.dto.RepliesCommentDTO;
import com.example.SuViet.model.RepliesComment;

public interface RepliesCommentService {
    public RepliesComment savedReplyComment(RepliesComment repliesComment);

    public RepliesComment getReplyCommentById(int replyId);

    public Page<RepliesCommentDTO> getAllPendingRepliescomment(Pageable pageable);
}