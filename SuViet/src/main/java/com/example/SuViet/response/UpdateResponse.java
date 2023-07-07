package com.example.SuViet.response;

import com.example.SuViet.dto.ProfileDTO;
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
    ProfileDTO dto;
}
