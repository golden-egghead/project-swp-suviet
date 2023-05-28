package com.example.SuViet.dto;

import java.time.LocalDate;

public class ArticleDTO {
    private int id;
    private String title;
    private String context;
    private String photo;
    private int vote;
    private LocalDate createdDate;
    private int userID;
    private boolean status;
    private int articleView;
    private boolean enabled;

    public ArticleDTO() {
    }

    public ArticleDTO(int id, String title, String context, String photo, int vote, LocalDate createdDate, int userID,
            boolean status, int articleView, boolean enabled) {
        this.id = id;
        this.title = title;
        this.context = context;
        this.photo = photo;
        this.vote = vote;
        this.createdDate = createdDate;
        this.userID = userID;
        this.status = status;
        this.articleView = articleView;
        this.enabled = enabled;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public int getVote() {
        return vote;
    }

    public void setVote(int vote) {
        this.vote = vote;
    }

    public LocalDate getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate) {
        this.createdDate = createdDate;
    }

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public int getArticleView() {
        return articleView;
    }

    public void setArticleView(int articleView) {
        this.articleView = articleView;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

}