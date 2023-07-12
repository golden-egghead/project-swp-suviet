package com.example.SuViet.controller;
import com.example.SuViet.dto.ProfileDTO;
import com.example.SuViet.model.Role;
import com.example.SuViet.response.ResponseJwt;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.response.UpdateResponse;
import com.example.SuViet.security.UpdateUsersDetails;
import com.example.SuViet.service.FileImageService;
import com.example.SuViet.service.ImageStorageService;
import com.example.SuViet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UpdateController {

    @Autowired
    private UserRepository userRepository;
    private final ImageStorageService imageStorageService;
    @Autowired
    private UserService userService;
    @GetMapping("/profile")
    public ResponseObject viewDetail(){
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());
        ProfileDTO profileDTO = new ProfileDTO();
        return new ResponseObject("OK", "Query successfully", profileDTO.convertToDTO(user));
    }
    private final FileImageService fileImageService;
    @PostMapping("/profile/update")
    public ResponseEntity<UpdateResponse> updateProfile(
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam(value = "fullName", required = false) String fullName
    ) throws IOException {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());
        user.setAvatar(fileImageService.storeFile( "avatars",image));

        userService.updateUser(user);
        if (fullName != null && !fullName.trim().isEmpty()) {
            if (hasSpecialCharacters(fullName)) {
                return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                        new UpdateResponse("FAILED", "FullName contains special characters.", null)
                );
            }
            user.setFullname(fullName);
        }

        userService.updateUser(user);

        ProfileDTO dto = new ProfileDTO();
        return ResponseEntity.status(HttpStatus.OK).body(
                new UpdateResponse("OK", "Profile updated successfully.", dto.convertToDTO(user))
        );
    }
    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<byte[]> readDetailFile(@PathVariable String filename) {
        try {
            byte[] bytes = fileImageService.readFileContent(filename);
            return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.IMAGE_JPEG)
                    .body(bytes);
        } catch (Exception e) {
            return ResponseEntity.noContent().build();
        }
    }

    public static boolean hasSpecialCharacters(String inputString) {
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
