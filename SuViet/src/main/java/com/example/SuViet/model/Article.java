package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblArticles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int articleID;
    private String title;
    private String context;
    private String photo;
    private int rate;
    private String createDate;
    private boolean enabled;

    public Article(int articleID, String title, String context, String photo, int rate, String createDate, boolean enabled) {
        this.articleID = articleID;
        this.title = title;
        this.context = context;
        this.photo = photo;
        this.rate = rate;
        this.createDate = createDate;
        this.enabled = enabled;
    }

    @OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Collection<Comment> comments;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinTable(name = "tblVotes",
            joinColumns = @JoinColumn(name = "UserID"),
            inverseJoinColumns = @JoinColumn(name = "ArticleID")
    )
    private Collection<User> users;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinTable(name = "tblPeriodArticle",
                joinColumns = @JoinColumn(name = "ArticleID"),
                inverseJoinColumns = @JoinColumn(name = "PeriodID")
    )
    private Collection<Period> periods;


}
