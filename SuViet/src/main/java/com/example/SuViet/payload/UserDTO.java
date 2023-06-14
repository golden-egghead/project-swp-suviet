package com.example.SuViet.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
    private String mail;
    private String fullName;
    private String role;

    public UserDTO() {
    }

    public UserDTO(String mail, String fullName, String role) {
        this.mail = mail;
        this.fullName = fullName;
        this.role = role;
    }
}
