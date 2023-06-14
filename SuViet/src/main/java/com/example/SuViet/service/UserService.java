package com.example.SuViet.service;

import com.example.SuViet.model.User;
import com.example.SuViet.payload.SignUp;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    public User registerANewMember(SignUp signUp);
    public boolean deleteAMember(int userID);
    public void sendVerificationMailToRegistration(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    public void sendVerificationMailToResetPassword(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    public boolean verify(String verificationCode);
    public String checkMailStatus(String mail, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException;
    public boolean resetPassword(String password, String code);
    public List<User> getAllUser();

    void changePassword(User user, String newPassword);
    boolean oldPasswordIsValid(User user ,String oldPassword);
    User updateUser(User user);
}
