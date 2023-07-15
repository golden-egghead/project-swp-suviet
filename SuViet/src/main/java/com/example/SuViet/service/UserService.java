package com.example.SuViet.service;

import com.example.SuViet.dto.UserInfo;
import com.example.SuViet.model.User;
import com.example.SuViet.dto.LoginDTO;
import com.example.SuViet.dto.SignUp;
import com.example.SuViet.response.LoginResponse;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;

import java.io.UnsupportedEncodingException;
import java.util.List;

public interface UserService {
    User registerANewMember(SignUp signUp);
    boolean banAMember(int userID);
    void sendVerificationMailToRegistration(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    void sendVerificationMailToResetPassword(User user, String siteURL) throws MessagingException, UnsupportedEncodingException;
    boolean verify(String verificationCode);
    String checkMailStatus(String mail, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException;
    boolean resetPassword(String password, String code);
    List<UserInfo> getAllUser();
    LoginResponse loginUser(LoginDTO loginDTO);
    void changePassword(User user, String newPassword);
    boolean oldPasswordIsValid(User user ,String oldPassword);
    User updateUser(User user);
    User getUserByMail( String mail);
    
    User getUserById(int userId);
    boolean updateRole(int id);
    User getUserByRoleName(String roleName);
    
    public List<User> getUsersWithModeratorRole(String roleName);
}
