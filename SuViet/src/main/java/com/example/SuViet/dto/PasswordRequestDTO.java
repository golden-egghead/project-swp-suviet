package com.example.SuViet.dto;

import com.example.SuViet.model.User;
import lombok.Data;

import java.util.stream.Collectors;

@Data
public class PasswordRequestDTO {
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;

    public boolean containsNullValues() {
        if (oldPassword.trim().isEmpty() || newPassword.trim().isEmpty() || confirmPassword.trim().isEmpty()) {
            return true;
        }
        return false;
    }

}
