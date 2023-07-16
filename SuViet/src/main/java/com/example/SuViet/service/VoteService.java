package com.example.SuViet.service;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Vote;

public interface VoteService {
    public Vote savedVote(Vote vote);

    public Vote getVoteById(int id);

    public Vote getArticleVoteByCurrentUser(Article article, User user);
}
