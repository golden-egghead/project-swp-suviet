package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.PasswordRequestUtil;
import com.example.SuViet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/user")
public class PasswordController {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    public PasswordController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/change_password")
    public ResponseObject changePassword(@RequestBody PasswordRequestUtil requestUtil, Authentication authentication) {
        authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = requestUtil.getEmail();
        System.out.println("email:" + email);
        User user = userService.getUserByMail(email);

        if (user == null) {
            return new ResponseObject("Error", "Null User", null);
        }
        if (passwordEncoder.matches(requestUtil.getOldPassword(), user.getPassword())) {
                userService.changePassword(user, requestUtil.getNewPassword());
                return new ResponseObject("OK", "Password changed successfully", user);
            } else {
                return new ResponseObject("Error", "Wrong password", null);
            }

    }

}
