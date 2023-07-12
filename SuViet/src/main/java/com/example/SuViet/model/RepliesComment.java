package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Data
@Table(name = "tblRepliesComment")
public class RepliesComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int ReplyID;

    // @Column(columnDefinition = "ntext", nullable = false)
	@Column(columnDefinition = "nvarchar(max)", nullable = false)
    private String commentText;

    @Column(columnDefinition = "date", nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private boolean enabled;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinColumn(name = "CommentID")
    private Comment comment;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ArticleID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Article article;
    

    public RepliesComment(String commentText, LocalDateTime createdDate, boolean enabled) {
        this.commentText = commentText;
        this.createdDate = createdDate;
        this.enabled = enabled;
    }
}
