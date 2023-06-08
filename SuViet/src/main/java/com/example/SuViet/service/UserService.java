package com.example.SuViet.service;

import com.example.SuViet.model.User;
import com.example.SuViet.payload.SignUp;

import java.util.List;

public interface UserService {
    public User registerANewMember(SignUp signUp);
    public boolean deleteAMember(int userID);
    public void sendVerificationMail(SignUp signUp, String siteURL);
}
