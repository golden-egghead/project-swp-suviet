package com.example.SuViet.dto;

import lombok.Data;

@Data
public class PasswordRequestDTO {
    private String email;
    private String oldPassword;
    private String newPassword;
}
