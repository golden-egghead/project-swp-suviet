package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblPeriods")
public class Period {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int periodID;

    @Column(columnDefinition = "nvarchar", length = 50, nullable = false)
    private String periodName;

    @Column(nullable = false)
    private boolean enabled;

    @Column(name = "Image", columnDefinition = "ntext", nullable = true)
    private String image;

    @Column(name = "Description", columnDefinition = "nvarchar", length = Integer.MAX_VALUE, nullable = true)
    private String description;

    @Column(name = "year", columnDefinition = "nvarchar", length = 50, nullable = true)
    private String year;

    public Period(int periodID, String periodName, boolean enabled, String image, String description, String year) {
        this.periodID = periodID;
        this.periodName = periodName;
        this.enabled = enabled;
        this.image = image;
        this.description = description;
        this.year = year;
    }

    @JsonIgnore
    @ManyToMany(mappedBy = "periods")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Article> articles;

    @OneToMany(mappedBy = "period")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Character> characters;

    @OneToMany(mappedBy = "period")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<HistoricalSite> historicalSites;

    @OneToMany(mappedBy = "period")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<HistoricalItem> historicalItems;

    @JsonIgnore
    @ManyToMany(mappedBy = "periods")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Video> videos;

    @JsonIgnore
    @ManyToMany(mappedBy = "periods")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Book> books;

}
