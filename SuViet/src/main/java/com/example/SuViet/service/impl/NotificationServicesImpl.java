package com.example.SuViet.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SuViet.model.Notification;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.NotificationRepository;
import com.example.SuViet.service.NotificationServices;

@Service
public class NotificationServicesImpl implements NotificationServices {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServicesImpl(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Override
    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getNotificationsForUser(User user) {
        return notificationRepository.findByUserAndEnabledOrderByCreatedDateDesc(user, true);
    }
}
