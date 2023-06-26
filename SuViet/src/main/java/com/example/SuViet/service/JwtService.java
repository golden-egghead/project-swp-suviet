package com.example.SuViet.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

public interface JwtService {
    String generateToken(UserDetails userDetails);

    String doGenerateToken(Map<String, Object> claims, String subject);

    String doGenerateRefreshToken(Map<String, Object> claims, String subject);

    boolean validateToken(String authToken);

    String getUsernameFromToken(String token);

    List<SimpleGrantedAuthority> getRolesFromToken(String token);


}
