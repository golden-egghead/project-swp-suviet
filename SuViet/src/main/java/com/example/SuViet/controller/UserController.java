package com.example.SuViet.controller;

import com.example.SuViet.config.SecurityConfig;
import com.example.SuViet.model.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.LoginDTO;
import com.example.SuViet.payload.SignUp;
import com.example.SuViet.payload.UserDTO;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.response.LoginResponse;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

//import static javax.swing.text.rtf.RTFAttributes.BooleanAttribute.False;

@RestController
@RequestMapping("/api/auth")
public class UserController {

//    @Autowired
//    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserService userService;

    @GetMapping("/checkEmail")
    public ResponseEntity<String> getEmail(@AuthenticationPrincipal OAuth2User oauth2User) {
        if (oauth2User == null) {
            return ResponseEntity.ok(new String("Please login!"));
        }
        String email = oauth2User.getAttribute("email");
        User user = userRepository.findByMailAndEnabled(email, true).get();
        if (user != null) {
            return ResponseEntity.ok(new String("Email has been used to sign up!"));
        }
        else {
            return ResponseEntity.ok(new String("Login successfully!"));
        }
    }


//    @GetMapping("/error")
//    public ResponseEntity<String> invalidUserOrPassword() {
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new String("Invalid email or password!")
//        );
//    }

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
                "Sign up succcessfully!!!\n" +
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
