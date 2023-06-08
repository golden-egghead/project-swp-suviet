package com.example.SuViet.model;


import lombok.*;

import jakarta.persistence.*;

import java.util.Collection;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblRoles")
public class Role {
    @Id
    @Column(name = "RoleID", nullable = false)
    private int roleID;
    @Column(columnDefinition = "varchar",length = 10, nullable = false)
    private String roleName;

    public Role(int roleID, String roleName) {
        this.roleID = roleID;
        this.roleName = roleName;
    }

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    Collection<User> users;
}
