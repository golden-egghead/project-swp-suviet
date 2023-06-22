package com.example.SuViet.controller;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.User;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.IOException;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/account")
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
    @GetMapping("/detail")
    public ResponseObject viewDetail(@AuthenticationPrincipal UpdateUsersDetails loggedUser){
        String email = loggedUser.getUsername();
        User user = userRepository.findByMail(email);

        return new ResponseObject("OK", "Query successfully", user);
    }

    @PutMapping("/profile")
    public ResponseObject updateProfile(User user,
                                   @RequestParam("image") MultipartFile file,
                                    @RequestParam("fullName") String fullName) throws IOException {
//        User loggedUser = userService.getUserByMail(
//                SecurityContextHolder.getContext().getAuthentication().getName());
        System.out.println("FullName: " + fullName);
        User loggedUser = userService.getUserByMail("nguyentuanvu113@gmail.com");
        if(file != null && !file.isEmpty()){
            loggedUser.setFullname(fullName);
            String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            user.setAvatar(fileName);
            User savedUser = userService.updateUser(user);

            //Save photo to user-photo direct
            String uploadDir = "user-photos/" + savedUser.getUserID();
            FileUploadUtil.saveFile(uploadDir, fileName, file);
        }else{
            loggedUser.setFullname(fullName);
            // Xóa ảnh đại diện nếu không có tệp tin mới được tải lên
            if (user.getAvatar().isEmpty()) {
                user.setAvatar(null);
            }
            userService.updateUser(user);
        }
        return new ResponseObject("OK", "Password changed successfully", null);
    }
}