package com.example.SuViet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.RepliesComment;

public interface RepliesCommentRepository extends JpaRepository<RepliesComment, Long> {
}