package com.example.SuViet.model;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Data
@Table(name = "tblTypeOfEvent")
public class TypeOfEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int typeOfEventID;

    @OneToOne
    @JoinColumn(name = "ArticleID")
    private Article article;
}
