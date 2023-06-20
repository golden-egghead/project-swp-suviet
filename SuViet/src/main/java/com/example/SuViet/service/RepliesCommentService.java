package com.example.SuViet.service;

import com.example.SuViet.model.RepliesComment;

public interface RepliesCommentService {
    public RepliesComment savedReplyComment(RepliesComment repliesComment);

    public RepliesComment getReplyCommentById(int replyId);
}