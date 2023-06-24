package com.example.SuViet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.Vote;

public interface VoteRepository extends JpaRepository<Vote , Integer> {
    
}
