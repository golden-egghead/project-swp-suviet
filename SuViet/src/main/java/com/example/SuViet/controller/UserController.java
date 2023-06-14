package com.example.SuViet.controller;

import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.Login;
import com.example.SuViet.payload.SignUp;
import com.example.SuViet.payload.UserDTO;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.service.UserService;
import com.example.SuViet.utils.Utility;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
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

    @GetMapping("/get")
    public ResponseEntity<ResponseObject> getAllUser() {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "OK", userService.getAllUser())
        );
    }
    @PostMapping("/login")
    public ResponseEntity<ResponseObject> login(@RequestBody Login login) {
        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    login.getMail(), login.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
        } catch (AuthenticationException e) {
            throw new AuthenticationException("Authentication failed: " + e.getMessage()) {};
        }
        boolean isEnabled = userRepository.findByMail(login.getMail()).isEnabled();
        if (!isEnabled) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponseObject("FAILED", "Please verify your email!!!", null)
            );
        }
//        if (userRepository.findByMail(login.getMail()).getPassword().equals(login.getPassword())) {
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new String("Invalid password!")
//            );
//        }
        String fullName = userRepository.findByMail(login.getMail()).getFullname();
        String role = userRepository.findByMail(login.getMail()).getRoles().toString();
        UserDTO userDTO = new UserDTO(login.getMail(), fullName, role);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponseObject("OK", "Login successfully", userDTO)
        );
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignUp signUp, HttpServletRequest request)
            throws MessagingException, UnsupportedEncodingException {
        if (userRepository.existsByMail(signUp.getMail())) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body("User has already exist!!!");
        }

        userService.registerANewMember(signUp);
        User user = userRepository.findByMail(signUp.getMail());
        String siteURL = Utility.getSiteUrl(request);
        userService.sendVerificationMailToRegistration(user, siteURL);
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

    @GetMapping("/verify")
    public String verifyAccount(@Param("code") String code) {
        boolean verified = userService.verify(code);
        if (verified) {
            return "Verify successfully";
        } else {
            return "Verify failed";
        }
    }

    @PostMapping("/forgot")
    public String forgotPassword(@RequestParam(value = "mail") String mail, HttpServletRequest request) throws MessagingException, UnsupportedEncodingException {
        return userService.checkMailStatus(mail, request);
    }

    @PostMapping("/reset-password/{code}")
    public String resetPassword(@RequestParam("password") String password, @PathVariable String code) {
        boolean resetPassword = userService.resetPassword(password, code);
        if (!resetPassword) {
            return "User does not exist!";
        } else {
            return "Reset password successfully";
        }
    }
}
