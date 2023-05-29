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
@Data
@Table(name = "tblMiniGames")
public class Minigame {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int MiniGameID;
    private String photo;
    private String content;
    private int gamePoint;
    private boolean enabled;

    public Minigame(int miniGameID, String photo, String content, int gamePoint, boolean enabled) {
        MiniGameID = miniGameID;
        this.photo = photo;
        this.content = content;
        this.gamePoint = gamePoint;
        this.enabled = enabled;
    }

    @OneToMany(mappedBy = "minigame", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<UserMiniGame> userMiniGames;

    @OneToMany(mappedBy = "minigame", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<PairOfQuizz> pairOfQuizzes;

}
