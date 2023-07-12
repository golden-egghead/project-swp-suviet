package com.example.SuViet.dto;

import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collection;
import java.util.stream.Collectors;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProfileDTO {
    String email;
    String fullName;
    String image;
    Collection<String> role;

    public ProfileDTO convertToDTO(User user){
        ProfileDTO dto = new ProfileDTO();
        dto.setEmail(user.getMail());
        dto.setFullName(user.getFullname());
        dto.setImage("http://localhost:8080/avatars/"+ user.getAvatar());
        dto.setRole(user.getRoles().stream().map(role -> role.getRoleName()).collect(Collectors.toList()));
        return dto;
    }
}
