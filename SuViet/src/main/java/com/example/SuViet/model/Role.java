package com.example.SuViet.model;


import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblRoles")
public class Role {
    private String roleName;

    public Role(String roleName) {
        this.roleName = roleName;
    }

    @Id
    @OneToOne
    @JoinColumn(name = "UserID")
    private User user;
}
