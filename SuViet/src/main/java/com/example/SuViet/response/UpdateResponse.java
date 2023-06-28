package com.example.SuViet.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateResponse {
    private String status;
    private String message;
    private String email;
    private String fullName;
    private String roleName;
}
