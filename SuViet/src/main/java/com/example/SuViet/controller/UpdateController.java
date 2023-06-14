package com.example.SuViet.controller;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.PasswordRequestUtil;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.security.UpdateUsersDetails;
import com.example.SuViet.service.UserService;
import com.example.SuViet.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/register")
public class UpdateController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @PostMapping("/change-password")
    public ResponseObject changePassword(@RequestBody PasswordRequestUtil requestUtil){
        User user = userRepository.findByMail(requestUtil.getEmail());
        if (!userService.oldPasswordIsValid(user, requestUtil.getOldPassword())){
            return new ResponseObject("NOT IMPLEMENTS", "Incorrect old password", null);
        }
        userService.changePassword(user, requestUtil.getNewPassword());
        return new ResponseObject("OK", "Password changed successfully", userRepository.findByMail(requestUtil.getEmail()));
    }
    @GetMapping("/account")
    public ResponseObject viewDetail(@AuthenticationPrincipal UpdateUsersDetails loggedUser){
        String email = loggedUser.getUsername();
        User user = userRepository.findByMail(email);

        return new ResponseObject("OK", "Query successfully", user);
    }
    @PostMapping("/account/update")
    public ResponseObject updateUser(User user,
                                   @RequestParam("file") MultipartFile file,
                                    @AuthenticationPrincipal UpdateUsersDetails loggedUser) throws IOException {
        if(!file.isEmpty()){
            loggedUser.setFullName(user.getFullname());
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            user.setAvatar(fileName);
            User savedUser = userService.updateUser(user);
            String uploadDir = "user-photos/" + savedUser.getUserID();
            FileUploadUtil.saveFile(uploadDir, fileName, file);
        }else{
            if(user.getAvatar().isEmpty()) user.setAvatar(null);
            userService.updateUser(user);
        }
        return new ResponseObject("OK", "Password changed successfully", null);
    }
}