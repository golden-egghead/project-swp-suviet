package com.example.SuViet.service.impl;

import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.SignUp;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.service.UserService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.Random;


@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender mailSender;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }


    @Override
    public User registerANewMember(SignUp signUp) {
        User user = new User();
        user.setMail(signUp.getMail());
        user.setPassword(passwordEncoder.encode(signUp.getPassword()));
        user.setFullname(signUp.getFullname());
        Collection<Role> roles = roleRepository.findAllByRoleName("MEMBER");
        user.setRoles(roles);
        user.setEnabled(false);
        String randomCode = generateString();
        user.setVerificationCode(randomCode);
        return userRepository.save(user);

    }

    @Override
    public void sendVerificationMail(User user, SignUp signUp, String siteURL)
            throws MessagingException, UnsupportedEncodingException {
        String subject = "Please verify your registration";
        String senderName = "Su Viet Team";
        String mailContent = "<p>Dear " + signUp.getFullname() + ", </p>";
        mailContent += "<p>Please click link below to verify your registration";
        String verifyURL = siteURL + "/veriry?code=" + user.getVerificationCode();
        mailContent += "<h3><a href=\"" + verifyURL + "\">VERIFY</a></h3>";
        mailContent += "<p>Thank you </br> Su Viet Team";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("boiboii162122@gmail.com", senderName);
        helper.setTo(signUp.getMail());
        helper.setSubject(subject);

        helper.setText(mailContent, true);
    }

    @Override
    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        if (user == null || user.isEnabled()) {
            return false;
        } else {
            userRepository.enable(user.getUserID());
            return true;
        }
    }


    public String generateString()
    {
        // create a string of all characters
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // create random string builder
        StringBuilder sb = new StringBuilder();

        // create an object of Random class
        Random random = new Random();

        // specify length of random string
        int length = 64;

        for(int i = 0; i < length; i++) {

            // generate random index number
            int index = random.nextInt(alphabet.length());

            // get character specified by index
            // from the string
            char randomChar = alphabet.charAt(index);

            // append the character to string builder
            sb.append(randomChar);
        }

        String randomString = sb.toString();
        System.out.println("Random String is: " + randomString);
        return randomString;
    }


    @Override
    public boolean deleteAMember(int userID) {
        User user = userRepository.findById(userID).get();
        if (user == null) {
            return false;
        } else {
            user.setEnabled(false);
            return true;
        }
    }


}
