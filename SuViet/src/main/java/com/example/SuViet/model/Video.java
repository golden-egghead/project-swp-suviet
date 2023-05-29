package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;
import java.util.Collection;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblVideos")
public class Video {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int videoID;
    private String title;
    private String video;
    private String description;
    private String createdDate;
    private boolean enabled;

    public Video(int videoID, String title, String video, String description, String createdDate, boolean enabled) {
        this.videoID = videoID;
        this.title = title;
        this.video = video;
        this.description = description;
        this.createdDate = createdDate;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinTable(name = "tblPeriodArticle",
            joinColumns = @JoinColumn(name = "VideoID"),
            inverseJoinColumns = @JoinColumn(name = "PeriodID")
    )
    private Collection<Period> periods;
}
