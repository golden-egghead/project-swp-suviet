package com.example.SuViet.model;


import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Table(name = "tblArticles")
public class Article {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ArticleID")
    private int id;

    @Column(name = "Title", nullable = false)
    private String title;

    @Column(name = "Context", nullable = false)
    private String context;

    @Column(name = "Photo", nullable = false)
    private String photo;

    @Column(name = "Vote", nullable = false)
    private int vote;

    @Column(name = "CreatedDate", nullable = false)
    private LocalDate createdDate;

    @Column(name = "UserID", nullable = false)
    private int userID;

    @Column(name = "status", nullable = false)
    private boolean status;

    @Column(name = "ArticleView", nullable = false)
    private int articleView;
    
    @Column(name = "Enabled", nullable = false)
    private boolean enabled;

}