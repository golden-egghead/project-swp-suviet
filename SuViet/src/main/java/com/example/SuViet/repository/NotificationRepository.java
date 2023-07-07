package com.example.SuViet.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.SuViet.model.Notification;
import com.example.SuViet.model.User;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    // List<Notification> findByUser(User user);
    List<Notification> findByUserAndEnabledOrderByCreatedDateDesc(User user, boolean enabled);

}

