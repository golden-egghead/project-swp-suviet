package com.example.SuViet.service.impl;

import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import com.example.SuViet.payload.SignUp;
import com.example.SuViet.repository.RoleRepository;
import com.example.SuViet.repository.UserRepository;
import com.example.SuViet.service.UserService;
import com.example.SuViet.utils.Utility;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Collection;
import java.util.List;
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

    @Value("${spring.mail.username}")
    private String fromEmail;


    @Override
    public boolean verify(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        if (user == null || user.isEnabled()) {
            return false;
        } else {
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
    }

    @Override
    public String checkMailStatus(String mail, HttpServletRequest request)
            throws MessagingException, UnsupportedEncodingException {
        User user = userRepository.findByMail(mail);
        String siteURL = Utility.getSiteUrl(request);
        if (!user.isEnabled()) {
            sendVerificationMailToRegistration(user, siteURL);
            return "Please check mail to verify your account!";
        }
        if (user == null) {
            return "Account do not exist! Please sign up!";
        }
        sendVerificationMailToResetPassword(user, siteURL);
        return "Please check mail to verify and reset password";
    }

    @Override
    public boolean resetPassword(String password, String code) {
        User user = userRepository.findByVerificationCode(code);
        if (user == null) {
            return false;
        }
        user.setPassword(passwordEncoder.encode(password));
        userRepository.save(user);
        return true;
    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
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

    @Override
    public void sendVerificationMailToRegistration(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String subject = "Verify your registration";
        String mailContent = "<p>Dear " + user.getFullname() + ", </p>";
        mailContent += "<p>Please click link below to verify your registration";
        String verifyURL = siteURL + "/api/auth/verify?code=" + user.getVerificationCode();
        mailContent += "<h3><a href=\"" + verifyURL + "\">VERIFY</a></h3>";
        mailContent += "<p>Thank you</br>, Nhân Nguyễn";
        sendVerificationMail(user, mailContent, subject);
    }

    @Override
    public void sendVerificationMailToResetPassword(User user, String siteURL) throws MessagingException, UnsupportedEncodingException {
        String subject = "Reset password";
        String mailContent = "<p>Dear " + user.getFullname() + ", </p>";
        mailContent += "<p>Please click link below to reset password";
        String verifyURL = siteURL + "/api/auth/reset-password/" + user.getVerificationCode();
        mailContent += "<h3><a href=\"" + verifyURL + "\">RESET PASSWORD</a></h3>";
        mailContent += "<p>Thank you</br>, Nhân Nguyễn";
        sendVerificationMail(user, mailContent, subject);
    }

    public void sendVerificationMail(User user, String mailContent, String subject)
            throws MessagingException, UnsupportedEncodingException {
        String senderName = "Nhân Nguyễn";


        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromEmail, senderName);
        helper.setTo(user.getMail());
        helper.setSubject(subject);

        helper.setText(mailContent, true);
        mailSender.send(message);
    }

    @Override
    public void changePassword(User user, String newPassword) {
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    @Override
    public boolean oldPasswordIsValid(User user, String oldPassword) {
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public User updateUser(User user) {
        return userRepository.save(user);
    }

}
