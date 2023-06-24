package com.example.SuViet.service.impl;

import org.springframework.stereotype.Service;

import com.example.SuViet.model.Vote;
import com.example.SuViet.repository.VoteRepository;
import com.example.SuViet.service.VoteService;

@Service
public class VoteServiceImpl implements VoteService {
    private final VoteRepository voteRepository;

    public VoteServiceImpl(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    @Override
    public Vote savedVote(Vote vote) {
        return voteRepository.save(vote);
    }

    @Override
    public Vote getVoteById(int id) {
        return voteRepository.findById(null).orElse(null);
    }
}
