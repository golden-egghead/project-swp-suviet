package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblCharacters")
public class Character {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int characterID;

    @Column(columnDefinition = "ntext", nullable = false)
    private String characterName;

    @Column(columnDefinition = "ntext", nullable = false)
    private String story;

    
    @Column(columnDefinition = "ntext", nullable = false)
    private String estate;

    @Column(nullable = false)
    private boolean enabled;
    @Column(columnDefinition = "ntext")
    private String image;
    @Column(name = "Description", columnDefinition = "ntext")
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;

}
