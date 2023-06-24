package com.example.SuViet.service;

import com.example.SuViet.model.Vote;

public interface VoteService {
    public Vote savedVote(Vote vote);
    public Vote getVoteById(int id);
}
