package com.example.SuViet.controller;
import com.example.SuViet.dto.ProfileDTO;
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
import java.nio.file.StandardCopyOption;
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
    @GetMapping("/profile")
    public ResponseObject viewDetail(){
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());
        ProfileDTO profileDTO = new ProfileDTO();
        return new ResponseObject("OK", "Query successfully", profileDTO.convertToDTO(user));
    }

    @PostMapping("/profile/update")
    public ResponseEntity<UpdateResponse> updateProfile(@RequestParam("image") MultipartFile image,
                                                        @RequestParam("fullName") String fullName) throws IOException {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());
//        String roleName = "";
//        List<Role> roles = (List<Role>) userRepository.findByMail(user.getMail()).get().getRoles();
//        for (Role role : roles) {
//            roleName = role.getRoleName();
//        }

        Path staticPath = Paths.get("D:\\SuVietProject\\Project_SWP391_SuViet_G7\\SuViet\\src\\main\\resources");
        Path imagePath = Paths.get("avatars");

        if (!image.isEmpty()) {
            if(!Files.exists(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath))) {
                Files.createDirectories(CURRENT_FOLDER.resolve(staticPath).resolve(imagePath));
            }
            System.out.println("IMAGE: " + user.getAvatar());
            System.out.println("Original: " + image.getOriginalFilename());
            System.out.println("Get Input Stream:" + image.getInputStream().toString());

            if(user.getAvatar() != null){
                Path oldFile = CURRENT_FOLDER.resolve(staticPath).resolve(user.getAvatar());
                Path updateFile = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                Files.copy(image.getInputStream(), updateFile, StandardCopyOption.REPLACE_EXISTING);
                Files.deleteIfExists(oldFile);
                user.setAvatar(imagePath.resolve(image.getOriginalFilename()).toString());
            }else {
                Path file = CURRENT_FOLDER.resolve(staticPath)
                        .resolve(imagePath).resolve(image.getOriginalFilename());
                try (OutputStream os = Files.newOutputStream(file)) {
                    os.write(image.getBytes());
                }
                user.setAvatar(imagePath.resolve(image.getOriginalFilename()).toString());
                  }
        }else{
                user.setAvatar(user.getAvatar());
        }
        if(hasSpecialCharacters(fullName) == true){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new UpdateResponse("FAILED", "FullName have contain special",null)
            );
        }

        if(!fullName.trim().isEmpty()){
            user.setFullname(fullName);
        }
        userService.updateUser(user);

        ProfileDTO dto = new ProfileDTO();
        return ResponseEntity.status(HttpStatus.OK).body(
                new UpdateResponse("OK", "UPDATE SUCCESSFULLY", dto.convertToDTO(user))
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
