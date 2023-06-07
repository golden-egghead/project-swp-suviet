package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.*;

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

    public HistoricalSite(int historicalSiteID, String location, String description, String photo, boolean enabled, String historicalSiteName) {
        this.historicalSiteID = historicalSiteID;
        this.location = location;
        this.description = description;
        this.photo = photo;
        this.enabled = enabled;
        this.historicalSiteName = historicalSiteName;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;


    @OneToMany(mappedBy = "historicalSite")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Collection<Image> images;
}
