package com.example.SuViet.dto;

import lombok.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserInfo {
    private int userID;
    private String email;
    private String fullname;
    private int point;
    private LocalDateTime createdDate;
    private int reported;
    private int roleID;
}
