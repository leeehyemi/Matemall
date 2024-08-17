package com.example.shoppingmate.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FavoriteProductRequest {
    private String email;
    private String productId;
    private String title;
    private String link;
    private String image;
    private int lprice;
}
