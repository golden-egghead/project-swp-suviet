package com.example.SuViet.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResponseJwt {
    private String status;
    private String message;
    private int userID;
    private String email;
    private String password;
    private String fullname;
    private String avatar;
    private String roleName;
    private String accessToken;
}
