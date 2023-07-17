package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.Date;

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

    @Column(columnDefinition = "nvarchar", length = 200, nullable = false)
    private String title;

    @Column(length = 2000, nullable = false)
    private String video;

    @Column(columnDefinition = "ntext", nullable = false)
    private String description;

    @Column(nullable = false, columnDefinition = "date")
    private LocalDateTime createdDate;

    private boolean enabled;

    @JsonIgnore
    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @JoinTable(
            name = "tblPeriodVideo",
            joinColumns = @JoinColumn(name = "VideoID"),
            inverseJoinColumns = @JoinColumn(name = "PeriodID")
    )
    private Collection<Period> periods;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
}
