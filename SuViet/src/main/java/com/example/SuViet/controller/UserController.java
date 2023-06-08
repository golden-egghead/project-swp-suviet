package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.Login;
import com.example.SuViet.payload.SignUp;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.service.UserService;
import com.example.SuViet.utils.Utility;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/api/auth")
public class UserController {

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


    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody Login login) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                login.getMail(), login.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Login successfully!!!", null)
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUp signUp, HttpServletRequest request) {
        if (userRepository.existsByMail(signUp.getMail())) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("User has already exist!!!");
        }

        userService.registerANewMember(signUp);
        String siteURL = Utility.getSiteUrl(request);
        userService.sendVerificationMail(signUp, siteURL);
        return ResponseEntity.status(HttpStatus.OK).body(
                "Sign up succcessfully!!!" +
                        "Please check your email to verify your account.");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<ResponseObject> deleteMember(@PathVariable int id) {
        boolean checkDelete = userService.deleteAMember(id);
        if (checkDelete == false) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "User does not exist", null)
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Delete Successfully", null)
        );
    }
}
