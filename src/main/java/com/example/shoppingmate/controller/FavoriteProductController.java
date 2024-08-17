package com.example.shoppingmate.controller;

import com.example.shoppingmate.Dto.FavoriteProductRequest;
import com.example.shoppingmate.domain.FavoriteProduct;
import com.example.shoppingmate.domain.User;
import com.example.shoppingmate.repository.FavoriteProductRepository;
import com.example.shoppingmate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/favorites")
public class FavoriteProductController {

    @Autowired
    private FavoriteProductRepository favoriteProductRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<String> addFavorite(@RequestBody FavoriteProductRequest request) {
        // Optional을 처리하기 위해 메서드를 수정
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        FavoriteProduct favoriteProduct = new FavoriteProduct();
        favoriteProduct.setUser(user);
        favoriteProduct.setProductId(request.getProductId());
        favoriteProduct.setTitle(request.getTitle());
        favoriteProduct.setLink(request.getLink());
        favoriteProduct.setImage(request.getImage());
        favoriteProduct.setLprice(request.getLprice());

        favoriteProductRepository.save(favoriteProduct);

        return ResponseEntity.ok("Product added to favorites");
    }

    @GetMapping("/{email}")
    public ResponseEntity<List<FavoriteProduct>> getFavorites(@PathVariable("email") String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        // Check if the user exists
        if (!userOptional.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);  // or use ResponseEntity.notFound().build();
        }

        User user = userOptional.get();
        List<FavoriteProduct> favorites = favoriteProductRepository.findByUser(user);
        return ResponseEntity.ok(favorites);
    }
}
