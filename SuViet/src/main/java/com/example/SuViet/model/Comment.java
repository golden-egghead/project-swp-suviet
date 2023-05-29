package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblComments")
public class Comment {
    private String comment;
    private String createdDate;
    private boolean enabled;

    public Comment(String comment, String createdDate, boolean enabled) {
        this.comment = comment;
        this.createdDate = createdDate;
        this.enabled = enabled;
    }

    @Id
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @Id
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ArticleID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Article article;

}
