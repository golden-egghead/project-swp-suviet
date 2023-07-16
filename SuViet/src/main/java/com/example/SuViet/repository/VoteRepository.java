package com.example.SuViet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.Article;
import com.example.SuViet.model.User;
import com.example.SuViet.model.Vote;

public interface VoteRepository extends JpaRepository<Vote, Integer> {
    Vote findByUserAndArticle(User user, Article article);
}
