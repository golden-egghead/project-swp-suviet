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
@Table(name = "tblBooks")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int bookID;
    private String title;
    private String author;
    private String category;
    private String description;
    private int pageNumber;
    private String publisher;
    private double price;
    private String cover;
    private boolean enabled;

    public Book(int bookID, String title, String author, String category, String description, int pageNumber, String publisher, double price, String cover, boolean enabled) {
        this.bookID = bookID;
        this.title = title;
        this.author = author;
        this.category = category;
        this.description = description;
        this.pageNumber = pageNumber;
        this.publisher = publisher;
        this.price = price;
        this.cover = cover;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinTable(name = "tblPeriodBook",
            joinColumns = @JoinColumn(name = "BookID"),
            inverseJoinColumns = @JoinColumn(name = "PeriodID")
    )
    private Collection<Period> periods;
}
