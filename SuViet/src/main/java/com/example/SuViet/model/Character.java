package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblCharacters")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int characterID;
    private String name;
    private String description;
    private String title;
    private boolean enabled;

    public Character(int characterID, String name, String description, String title, boolean enabled) {
        this.characterID = characterID;
        this.name = name;
        this.description = description;
        this.title = title;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;
}
