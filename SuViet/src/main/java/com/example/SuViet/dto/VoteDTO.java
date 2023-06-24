package com.example.SuViet.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class VoteDTO {
    private int userID;
    private int articleID;
    private int voteLevel;
}
