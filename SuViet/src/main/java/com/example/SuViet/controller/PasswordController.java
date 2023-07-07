package com.example.SuViet.controller;

import com.example.SuViet.dto.ProfileDTO;
import com.example.SuViet.response.ResponseObject;
import com.example.SuViet.model.User;
import com.example.SuViet.dto.PasswordRequestDTO;
import com.example.SuViet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordController {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private UserService userService;

    public PasswordController(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @PutMapping("/change_password")
    public ResponseObject changePassword(@RequestBody PasswordRequestDTO dto) {
        User user = userService.getUserByMail(
                SecurityContextHolder.getContext().getAuthentication().getName());

        if(dto.containsNullValues()){
            return new ResponseObject("NO_CONTENT", "Lack of information", null);
        }

        if (user == null) {
            return new ResponseObject("NO_CONTENT", "Null User", null);
        }

        if (userService.oldPasswordIsValid(user, dto.getOldPassword())) {
          if(dto.getNewPassword().equals(dto.getConfirmPassword()) == true){
              userService.changePassword(user, dto.getNewPassword());

              ProfileDTO profileDTO = new ProfileDTO();
              return new ResponseObject("OK", "Password changed successfully",profileDTO.convertToDTO(user));
          }else{
              return new ResponseObject("NOT_IMPLEMENT", "Confirm Password is invalid!", null);
          }
        } else {
            return new ResponseObject("NOT_IMPLEMENT", "Old Password is not corrected", null);
        }
    }

}
