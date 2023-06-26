package com.example.SuViet.config;

import com.example.SuViet.model.User;
import com.example.SuViet.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CustomUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByMail(username);
        List<SimpleGrantedAuthority> roles = null;
        if (user != null) {
            roles = user.get()
                    .getRoles()
                    .stream()
                    .map((role) -> new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
            return new org.springframework.security.core.userdetails.User(user.get().getMail(), user.get().getPassword(), roles);
        }
        throw new UsernameNotFoundException("User not found with the name " + username);	}
}
