package com.example.shoppingmate.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "favorite_products")
@Getter
@Setter
public class FavoriteProduct {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name= "email", referencedColumnName = "email")
    private User user;

    private String productId;
    private String title;
    private String link;
    private String image;
    private int lprice;

}
