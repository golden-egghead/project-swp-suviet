package com.example.SuViet.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

}