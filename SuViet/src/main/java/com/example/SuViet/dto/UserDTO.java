package com.example.SuViet.dto;

import com.example.SuViet.model.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserDTO {
    private String fullName;
    private String avatar;
    private int userId;

    public static UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setAvatar(user.getAvatar());
        dto.setFullName(user.getFullname());
        dto.setUserId(user.getUserID());
        return dto;
    }

    public User convertToEntity() {
        User user = new User();
        user.setFullname(this.fullName);

        return user;
    }
}
