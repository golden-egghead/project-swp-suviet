package com.example.SuViet.repository;

import com.example.SuViet.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Role findByRoleName(String name);
    Collection<Role> findAllByRoleName(String name);
}
