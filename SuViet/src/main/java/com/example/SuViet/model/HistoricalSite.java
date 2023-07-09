package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.Collection;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblHistoricalSites")
public class HistoricalSite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int historicalSiteID;

    @Column(columnDefinition = "ntext", nullable = false)
    private String location;

    @Column(columnDefinition = "ntext", nullable = false)
    private String description;

    @Column(length = 200, nullable = false)
    private String photo;

    @Column(nullable = false)
    private boolean enabled;

    @Column(columnDefinition = "nvarchar", length = 200, nullable = false)
    private String historicalSiteName;

    @Column(nullable = true)
    private LocalDateTime createdDate;

    @Column(nullable = true, columnDefinition = "nvarchar", length = Integer.MAX_VALUE, name = "Detail")
    private String detail;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID", nullable = true)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;


    @OneToMany(mappedBy = "historicalSite")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<HistoricalSiteImage> images;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "UserID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;
}
