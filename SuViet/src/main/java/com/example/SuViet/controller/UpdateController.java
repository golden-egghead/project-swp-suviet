package com.example.SuViet.controller;
import com.example.SuViet.model.Role;
import com.example.SuViet.response.ResponseJwt;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.response.UpdateResponse;
import com.example.SuViet.security.UpdateUsersDetails;
import com.example.SuViet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("api/user")
public class UpdateController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    @GetMapping("/detail")
    public ResponseObject viewDetail(@AuthenticationPrincipal UpdateUsersDetails loggedUser){
        String email = loggedUser.getUsername();
        User user = userRepository.findByMail(email).get();

        return new ResponseObject("OK", "Query successfully", user);
    }

    @PostMapping("/profile")
    public ResponseEntity<UpdateResponse> updateProfile(@RequestParam("image") MultipartFile image,
                                                        @RequestParam("fullName") String fullName) throws IOException {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());
        String roleName = "";
        List<Role> roles = (List<Role>) userRepository.findByMail(user.getMail()).get().getRoles();
        for (Role role : roles) {
            roleName = role.getRoleName();
        }

        Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
        Path imagePath = Paths.get("avatars");

        if(!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body(
                    new UpdateResponse("OK", "File image is incorrect", "", "", "")
            );
        }
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(image.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        }
        if(hasSpecialCharacters(fullName) == true){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new UpdateResponse("FAILED", "FullName have contain special", "", "", "")
            );
        }else{
            user.setFullname(fullName);
        }
        user.setAvatar(imagePath.resolve(image.getOriginalFilename()).toString());
        userRepository.save(user);

        return ResponseEntity.status(HttpStatus.OK).body(
                new UpdateResponse("OK", "UPDATE SUCCESSFULLY", user.getMail(), user.getFullname(), roleName)
        );

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
