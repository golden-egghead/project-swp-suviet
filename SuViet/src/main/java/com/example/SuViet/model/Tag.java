package com.example.SuViet.model;

import lombok.*;

import jakarta.persistence.*;
import java.util.Collection;

import com.fasterxml.jackson.annotation.JsonIgnore;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tblTags")
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TagID")
    private int tagID;

    @Column(name = "TagName", columnDefinition = "nvarchar(100)", nullable = false)
    private String tagName;

    @JsonIgnore
    @ManyToMany(mappedBy = "tags", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Article> articles;

    public Tag(String tagName) {
        this.tagName = tagName;
    }
}
