package com.example.SuViet.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

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
    private String location;
    private String description;
    private String photo;
    private boolean enabled;

    public HistoricalSite(int historicalSiteID, String location, String description, String photo, boolean enabled) {
        this.historicalSiteID = historicalSiteID;
        this.location = location;
        this.description = description;
        this.photo = photo;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "PeriodID")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Period period;
}
