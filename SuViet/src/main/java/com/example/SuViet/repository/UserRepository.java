package com.example.SuViet.repository;

import com.example.SuViet.model.Role;
import com.example.SuViet.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByMail(String email);
    boolean existsByMail(String mail);

    @Query("SELECT u FROM User u WHERE u.verificationCode like ?1")
    User findByVerificationCode(String code);

    Optional<User> findByMailAndPassword(String mail, String encodedPassword);
    Optional<User> findByMailAndEnabled(String email, boolean isEnabled);

    User findByRoles_RoleName(String roleName);

    List<User> findByRolesRoleName(String roleName);

}
