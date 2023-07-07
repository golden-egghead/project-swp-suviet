package com.example.SuViet.service;

import java.util.List;

import com.example.SuViet.model.Notification;
import com.example.SuViet.model.User;

public interface NotificationServices {
    public Notification createNotification(Notification notification);
    public List<Notification> getNotificationsForUser(User user);
}
