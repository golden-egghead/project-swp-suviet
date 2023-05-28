package com.example.SuViet.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

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
    private String quesion;
    private String answer;
    private int gameSlicePoint;
    private boolean enabled;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "MiniGameID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Minigame minigame;
}
