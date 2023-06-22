package com.example.SuViet.payload;

import lombok.Data;

@Data
public class PasswordRequestDTO {
    private String email;
    private String oldPassword;
    private String newPassword;
}
