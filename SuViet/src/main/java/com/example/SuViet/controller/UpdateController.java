package com.example.SuViet.controller;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.security.UpdateUsersDetails;
import com.example.SuViet.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class UpdateController {
    private static final Path CURRENT_FOLDER = Paths.get(System.getProperty("user.dir"));

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;
    @GetMapping("/detail")
    public ResponseObject viewDetail(@AuthenticationPrincipal UpdateUsersDetails loggedUser){
        String email = loggedUser.getUsername();
        User user = userRepository.findByMail(email);

        return new ResponseObject("OK", "Query successfully", user);
    }

    @PostMapping("/profile")
    public ResponseObject updateProfile(@RequestParam("image") MultipartFile image,
                                        @RequestParam("fullName") String fullName) throws IOException {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());

//        User user = userService.getUserByMail("nguyentuanvu113@gmail.com");
        Path staticPath = Paths.get("static");
        Path imagePath = Paths.get("images");

        if(!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
            Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
        }
        Path file = CURRENT_FOLDER.resolve(staticPath)
                .resolve(imagePath).resolve(image.getOriginalFilename());
        try (OutputStream os = Files.newOutputStream(file)) {
            os.write(image.getBytes());
        }
        user.setFullname(fullName);
        user.setAvatar(imagePath.resolve(image.getOriginalFilename()).toString());
        userRepository.save(user);
        return new ResponseObject("OK", "Password changed successfully", null);

    }

    }
