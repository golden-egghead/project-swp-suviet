package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tblHistoricalSiteImages")
public class HistoricalSiteImage {
    @Id
    @Column(name = "ImageID", nullable = false)
    private int imageID;

    @Column(name = "Link", columnDefinition = "nvarchar", length = Integer.MAX_VALUE)
    private String link;

    @Column(name = "Description", columnDefinition = "nvarchar", length = Integer.MAX_VALUE)
    private String description;

    public HistoricalSiteImage(int imageID, String link, String description) {
        this.imageID = imageID;
        this.link = link;
        this.description = description;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "HistoricalSiteID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private HistoricalSite historicalSite;
}
