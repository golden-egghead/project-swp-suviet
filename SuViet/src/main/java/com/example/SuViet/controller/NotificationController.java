package com.example.SuViet.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.SuViet.model.Notification;
import com.example.SuViet.model.User;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.service.NotificationServices;
import com.example.SuViet.service.UserService;

@RestController
@RequestMapping(path = "/api/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {
    private NotificationServices notificationServices;
    private UserService userService;

    @Autowired
    public NotificationController(NotificationServices notificationServices, UserService userService) {
        this.notificationServices = notificationServices;
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<ResponseObject> getNotification() {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            User user = userService.getUserByMail(userEmail);

            List<Notification> notificationList = notificationServices.getNotificationsForUser(user);

            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject("OK", "Query successful", notificationList));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    new ResponseObject("ERROR", "An error occurred", null));
        }
    }

}
