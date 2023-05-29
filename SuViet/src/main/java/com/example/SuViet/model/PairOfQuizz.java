package com.example.SuViet.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblPairOfQuizz")
public class PairOfQuizz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int pairOfQuizzID;
    private String question;
    private String answer;
    private int gameSlicePoint;
    private boolean enabled;

    public PairOfQuizz(int pairOfQuizzID, String question, String answer, int gameSlicePoint, boolean enabled) {
        this.pairOfQuizzID = pairOfQuizzID;
        this.question = question;
        this.answer = answer;
        this.gameSlicePoint = gameSlicePoint;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MiniGameID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Minigame minigame;
}
