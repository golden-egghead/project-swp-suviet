package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblComments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentID;
    private String comment;
    private String createdDate;
    private boolean enabled;

    public Comment(int commentID, String comment, String createdDate, boolean enabled) {
        this.commentID = commentID;
        this.comment = comment;
        this.createdDate = createdDate;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "ArticleID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Article article;

}
