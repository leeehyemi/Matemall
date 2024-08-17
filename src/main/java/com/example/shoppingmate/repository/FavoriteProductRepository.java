package com.example.shoppingmate.repository;

import com.example.shoppingmate.domain.FavoriteProduct;
import com.example.shoppingmate.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FavoriteProductRepository extends JpaRepository<FavoriteProduct, Long> {
    List<FavoriteProduct> findByUser(User user);
}

