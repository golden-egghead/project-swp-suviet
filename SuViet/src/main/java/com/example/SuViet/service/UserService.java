package com.example.SuViet.service;

import com.example.SuViet.model.User;
import com.example.SuViet.payload.SignUp;
import jakarta.mail.MessagingException;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    public User registerANewMember(SignUp signUp);
    public boolean deleteAMember(int userID);
    public void sendVerificationMail(User user, SignUp signUp, String siteURL) throws MessagingException, UnsupportedEncodingException;
    public boolean verify(String verificationCode);
}
