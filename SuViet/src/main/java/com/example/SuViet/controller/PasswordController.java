package com.example.SuViet.controller;

import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.dto.PasswordRequestDTO;
import com.example.SuViet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordController {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    public PasswordController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/change_password")
    public ResponseObject changePassword(@RequestBody PasswordRequestDTO dto) {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());

        if (user == null) {
            return new ResponseObject("Error", "Null User", null);
        }
        if (userService.oldPasswordIsValid(user, dto.getOldPassword())) {
            userService.changePassword(user, dto.getNewPassword());
            return new ResponseObject("OK", "Password changed successfully", user);
        } else {
            return new ResponseObject("Error", "Old Password is uncorrected", null);
        }
    }

}
