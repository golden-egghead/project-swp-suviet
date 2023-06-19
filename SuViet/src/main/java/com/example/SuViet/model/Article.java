package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.util.Collection;
import java.util.Date;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "tblArticles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articleID;

    @Column(columnDefinition = "nvarchar(100)", nullable = false)
    private String title;

    @Column(columnDefinition = "nvarchar(max)", nullable = false)
    private String context;

    @Column(length = 200, nullable = false)
    private String photo;

    @Column(columnDefinition = "date", nullable = false)
    private Date createdDate;

    @Column(nullable = false)
    private boolean status;

    @Column(nullable = false)
    private int articleView;

    @Column(nullable = false)
    private boolean enabled;

    public Article(int articleID, String title, String context, String photo, Date createdDate, boolean status,
            int articleView, boolean enabled) {
        this.articleID = articleID;
        this.title = title;
        this.context = context;
        this.photo = photo;
        this.createdDate = createdDate;
        this.status = status;
        this.articleView = articleView;
        this.enabled = enabled;
    }

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Comment> comments;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<RepliesComment> repliesComments;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Vote> votes;

    @ManyToMany(cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinTable(
        name = "tblPeriodArticle",
        joinColumns = @JoinColumn(name = "ArticleID"),
        inverseJoinColumns = @JoinColumn(name = "PeriodID")
    )
    private Collection<Period> periods;

}
