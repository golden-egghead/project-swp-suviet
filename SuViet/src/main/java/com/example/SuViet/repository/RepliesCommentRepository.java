package com.example.SuViet.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.SuViet.model.RepliesComment;

public interface RepliesCommentRepository extends JpaRepository<RepliesComment, Integer> {
    Page<RepliesComment> findByEnabledIsTrueAndStatusIsFalse(Pageable pageable);
}