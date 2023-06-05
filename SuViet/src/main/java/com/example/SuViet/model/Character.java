package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.Nationalized;

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

    @Column(columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = false)
    private String characterName;

    @Column(columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = false)
    private String story;

    
    @Column(columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = false)
    private String estate;

    @Column(nullable = false)
    private boolean enabled;
    @Column(name = "Image", columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = false)
    private String image;

    @Column(name = "Description", columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = false)
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;

}
