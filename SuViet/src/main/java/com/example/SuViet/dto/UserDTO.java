package com.example.SuViet.dto;

import com.example.SuViet.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private int userID;
    private String mail;
    private String password;
    private String achievement;
    private int point;
    private String fullName;
    private String createdDate;
    private int reported;
    private boolean enabled;
    private String verificationCode;
    private String avatar;

    public static UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setUserID(user.getUserID());
        dto.setMail(user.getMail());
        dto.setPassword(user.getPassword());
        dto.setAchievement(user.getAchievement());
        dto.setPoint(user.getPoint());
        dto.setFullName(user.getFullname());
        // Set other fields as needed

        return dto;
    }

    public User convertToEntity() {
        User user = new User();
        user.setUserID(this.userID);
        user.setMail(this.mail);
        user.setPassword(this.password);
        user.setAchievement(this.achievement);
        user.setPoint(this.point);
        user.setFullname(this.fullName);
        // Set other fields as needed

        return user;
    }
}
