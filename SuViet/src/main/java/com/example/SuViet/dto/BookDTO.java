package com.example.SuViet.dto;

import com.example.SuViet.model.Period;
import com.example.SuViet.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BookDTO {
    private int bookID;
    private String title;
    private String author;
    private String category;
    private String description;
    private int pageNumber;
    private String yearOfPublication;
    private Date createdDate;
    private String publisher;
    private double price;
    private String cover;
    private boolean enabled;
    private Collection<Period> periods;
    private List<String> periodName;
    private User user;
    public boolean hasSpecialCharacters(String inputString) {
        String specialCharacters = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

        for (int i = 0; i < inputString.length(); i++) {
            char ch = inputString.charAt(i);
            if (specialCharacters.contains(String.valueOf(ch))) {
                return true;
            }
        }
        return false;
    }
}
