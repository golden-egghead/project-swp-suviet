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
@Table(name = "tblNotifications")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationID;
    private String message;
    private String time;
    private boolean enabled;

    public Notification(int notificationID, String message, String time, boolean enabled) {
        this.notificationID = notificationID;
        this.message = message;
        this.time = time;
        this.enabled = enabled;
    }

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "UserID")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private User user;
}
