package com.example.SuViet.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "tblUsers")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int UserID;
    private String mail;
    private String password;
    private String achievement;
    private int point;
    private String fullname;
    private String createdDate;
    private int reported;
    private boolean enabled;

    public User(int userID, String mail, String password, String achievement, int point, String fullname, String createdDate, int reported, boolean enabled) {
        UserID = userID;
        this.mail = mail;
        this.password = password;
        this.achievement = achievement;
        this.point = point;
        this.fullname = fullname;
        this.createdDate = createdDate;
        this.reported = reported;
        this.enabled = enabled;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Notification> notifications;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<UserMiniGame> userMiniGames;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Article> articles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Vote> votes;
}
