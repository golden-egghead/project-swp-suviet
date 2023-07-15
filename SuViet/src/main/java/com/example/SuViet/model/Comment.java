package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collection;

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

    // @Column(columnDefinition = "ntext", nullable = false)
	@Column(columnDefinition = "nvarchar(max)", nullable = false)
    private String commentText;

    @Column(columnDefinition = "date", nullable = false)
    private LocalDateTime createdDate;

    @Column(nullable = false)
    private boolean status;

    @Column(nullable = false)
    private boolean enabled;

    public Comment(String commentText, LocalDateTime createdDate,
        boolean status, boolean enabled) {
        this.commentText = commentText;
        this.createdDate = createdDate;
        this.status = status;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "ArticleID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Article article;
    

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<RepliesComment> repliesComments;

}
